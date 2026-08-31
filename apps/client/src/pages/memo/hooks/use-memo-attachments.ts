import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { FileType, ImageType } from '@pages/memo/types/memo-type';

import { uploadToS3, useIssuePresignedUrls } from '../apis/queries';
import { PostPresignedUrlsResponse } from '../apis/type';

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

  if (lastDotIndex === -1) {
    return '';
  }

  return fileName.slice(lastDotIndex + 1).toLowerCase();
};

const isImage = (file: File) => file.type.startsWith('image/');

const readIssuedUrls = (response: PostPresignedUrlsResponse) => {
  if (response.data === undefined) {
    throw new Error('presigned URL 응답에 data가 존재하지 않아요');
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
    }: AttachFilesParams): Promise<AttachedFiles> => {
      const selectedImages = selectedFiles.filter(isImage);
      const selectedDocuments = selectedFiles.filter((file) => !isImage(file));

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

      await Promise.all([
        ...issuedUrls.images.map((issued, index) =>
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
