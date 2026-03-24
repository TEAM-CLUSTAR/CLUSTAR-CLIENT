import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';
import { LabelTextType } from '@shared/types/label-type';

import { MEMO_MODAL_END_POINT } from './end-point';
import { MEMO_MODAL_KEY } from './query-key';
import { MemoDetailRequest, MemoDetailResponse } from './type';

export interface SelectedMemoTypes {
  memoId: number;
  title: string;
  content: string;
  images: {
    imageId: number;
    imageUrl: string;
    imageName: string;
    imageExtension: string;
    imageSize: string;
  }[];
  files: {
    fileId: number;
    fileUrl: string;
    fileName: string;
    fileExtension: string;
    fileSize: string;
  }[];
  labelList: {
    labelId: number;
    name: LabelTextType;
  }[];
  createdAt: string;
  isAiGenerated: boolean;
  sourceMemoTitleList: string[];
}

interface useDetailMemoProps {
  memoId: number;
  enabled?: boolean;
}

export const detailMemo = async (
  memoId: MemoDetailRequest,
): Promise<MemoDetailResponse> => {
  const response = await api.get<MemoDetailResponse>(
    MEMO_MODAL_END_POINT.DETAIL(memoId),
  );
  return response.data;
};

export const useDetailMemo = ({ memoId, enabled }: useDetailMemoProps) => {
  return useQuery({
    queryKey: MEMO_MODAL_KEY.DETAIL({ memoId }),
    queryFn: () => detailMemo({ memoId }),
    enabled: enabled && !!memoId,
    select: (response): SelectedMemoTypes => {
      return {
        memoId: response.data?.memoId ?? 0,
        title: response.data?.title ?? '',
        content: response.data?.content ?? '',
        images: (response.data?.images ?? []).map((img) => ({
          imageId: img.imageId ?? 0,
          imageUrl: img.imageUrl ?? '',
          imageName: img.imageName ?? '',
          imageExtension: img.imageExtension ?? '',
          imageSize: img.imageSize ?? '',
        })),
        files: (response.data?.files ?? []).map((file) => ({
          fileId: file.fileId ?? 0,
          fileUrl: file.fileUrl ?? '',
          fileName: file.fileName ?? '',
          fileExtension: file.fileExtension ?? '',
          fileSize: file.fileSize ?? '',
        })),
        labelList: (response.data?.labelList ?? []).map((label) => ({
          labelId: label.labelId ?? 0,
          name: (label.name ?? '') as LabelTextType,
        })),
        createdAt: response.data?.createdAt ?? '',
        isAiGenerated: response.data?.isAiGenerated ?? false,
        sourceMemoTitleList: response.data?.sourceMemoTitleList ?? [],
      };
    },
  });
};
