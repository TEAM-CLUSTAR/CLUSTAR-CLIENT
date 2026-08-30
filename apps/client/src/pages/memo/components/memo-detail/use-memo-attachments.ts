import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { FileType, ImageType } from '@pages/memo/types/memo-type';

import { uploadToS3, useIssuePresignedUrls } from '../../apis/queries';
import { PostPresignedUrlsResponse } from '../../apis/type';

/** 이미지·파일 각각의 제한이에요. 서버 스펙(각 최대 5개, 이미지 5MB/파일 10MB)과 같아요. */
const MAX_ATTACHMENT_COUNT = 5;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const BYTES_IN_MEGABYTE = 1024 * 1024;

interface AttachFilesParams {
  selectedFiles: File[];
  currentImages: ImageType[];
  currentFiles: FileType[];
}

interface AttachedFiles {
  images: ImageType[];
  files: FileType[];
}

const formatFileSize = (bytes: number) =>
  `${(bytes / BYTES_IN_MEGABYTE).toFixed(2)}MB`;

const getExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.');

  // 확장자가 없으면 서버가 판단할 수 있도록 빈 문자열을 보내요.
  if (lastDotIndex === -1) {
    return '';
  }

  return fileName.slice(lastDotIndex + 1).toLowerCase();
};

const isImage = (file: File) => file.type.startsWith('image/');

/**
 * 개수·용량을 넘긴 첨부는 업로드 자체를 하지 않아요.
 * 서버도 막지만, 올린 뒤에 거절당하면 사용자가 이유를 알기 어려워요.
 */
const validateAttachments = ({
  selectedImages,
  selectedFiles,
  currentImages,
  currentFiles,
}: {
  selectedImages: File[];
  selectedFiles: File[];
  currentImages: ImageType[];
  currentFiles: FileType[];
}) => {
  if (currentImages.length + selectedImages.length > MAX_ATTACHMENT_COUNT) {
    throw new Error(
      `이미지는 최대 ${MAX_ATTACHMENT_COUNT}개까지 첨부할 수 있어요.`,
    );
  }

  if (currentFiles.length + selectedFiles.length > MAX_ATTACHMENT_COUNT) {
    throw new Error(
      `파일은 최대 ${MAX_ATTACHMENT_COUNT}개까지 첨부할 수 있어요.`,
    );
  }

  if (selectedImages.some((image) => image.size > MAX_IMAGE_BYTES)) {
    throw new Error('이미지는 한 개당 5MB까지 첨부할 수 있어요.');
  }

  if (selectedFiles.some((file) => file.size > MAX_FILE_BYTES)) {
    throw new Error('파일은 한 개당 10MB까지 첨부할 수 있어요.');
  }
};

const readIssuedUrls = (response: PostPresignedUrlsResponse) => {
  if (response.data === undefined) {
    throw new Error('presigned URL 응답에 data가 없어요.');
  }

  return response.data;
};

/**
 * 파일 선택 → presigned URL 발급 → S3 업로드까지를 담당해요.
 * 업로드가 끝난 첨부는 s3Key만 가진 상태로 돌려주고, 메모에 반영하는 건 호출한 쪽이 정해요.
 */
export const useMemoAttachments = () => {
  const issuePresignedUrls = useMutation(useIssuePresignedUrls());

  // 미리보기 주소는 브라우저가 들고 있는 자원이라 화면을 떠날 때 직접 반납해야 해요.
  const previewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach(URL.revokeObjectURL);
      previewUrlsRef.current = [];
    };
  }, []);

  const createPreviewUrl = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    previewUrlsRef.current.push(previewUrl);

    return previewUrl;
  };

  const attachFiles = useMutation({
    mutationFn: async ({
      selectedFiles,
      currentImages,
      currentFiles,
    }: AttachFilesParams): Promise<AttachedFiles> => {
      const selectedImages = selectedFiles.filter(isImage);
      const selectedDocuments = selectedFiles.filter((file) => !isImage(file));

      validateAttachments({
        selectedImages,
        selectedFiles: selectedDocuments,
        currentImages,
        currentFiles,
      });

      const toUploadRequest = (file: File, index: number) => ({
        extension: getExtension(file.name),
        bytes: file.size,
        priority: index,
      });

      const issuedUrls = readIssuedUrls(
        await issuePresignedUrls.mutateAsync({
          images: selectedImages.map(toUploadRequest),
          files: selectedDocuments.map(toUploadRequest),
        }),
      );

      // 발급 순서와 업로드 대상이 1:1로 짝지어져 있어요.
      await Promise.all([
        ...issuedUrls.images.map((issued, index) =>
          // contentType은 서명에 포함된 값이라 서버가 준 걸 그대로 보내야 해요.
          uploadToS3(
            issued.presignedUrl,
            issued.contentType,
            selectedImages[index],
          ),
        ),
        ...issuedUrls.files.map((issued, index) =>
          uploadToS3(
            issued.presignedUrl,
            issued.contentType,
            selectedDocuments[index],
          ),
        ),
      ]);

      return {
        images: issuedUrls.images.map((issued, index) => ({
          status: 'uploaded',
          s3Key: issued.s3Key,
          imageUrl: createPreviewUrl(selectedImages[index]),
          imageName: selectedImages[index].name,
          imageSize: formatFileSize(selectedImages[index].size),
        })),
        files: issuedUrls.files.map((issued, index) => ({
          status: 'uploaded',
          s3Key: issued.s3Key,
          fileUrl: createPreviewUrl(selectedDocuments[index]),
          fileName: selectedDocuments[index].name,
          fileSize: formatFileSize(selectedDocuments[index].size),
        })),
      };
    },
  });

  return {
    attachFiles: attachFiles.mutate,
    isAttaching: attachFiles.isPending,
    attachError: attachFiles.error,
  };
};
