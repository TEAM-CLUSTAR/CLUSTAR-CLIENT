import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import { STRUCTURE_MEMO_END_POINT } from './end-point';
import { MEMO_STRUCTURE_KEY } from './query-key';
import { MemoStructureReadResponse } from './type';

export const readMemoStructure =
  async (): Promise<MemoStructureReadResponse> => {
    const response = await api.get<MemoStructureReadResponse>(
      STRUCTURE_MEMO_END_POINT.READ,
    );
    return response.data;
  };

export const useReadMemoStructure = () => {
  return useQuery({
    queryKey: MEMO_STRUCTURE_KEY.READ(),
    queryFn: readMemoStructure,
    select: (response): StructureMemoTypes[] => {
      const memos = response.data?.memos;
      if (!memos) return [];
      return memos.map((memo) => ({
        memoId: memo.memoId ?? 0,
        title: memo.title ?? '',
        content: memo.content ?? '',
        labelList:
          memo.labelList?.map((label) => ({
            labelId: label.labelId ?? 0,
            name: label.name ?? '',
          })) ?? [],
      }));
    },
  });
};
