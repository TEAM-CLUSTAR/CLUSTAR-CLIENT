import { useQuery } from '@tanstack/react-query';

import { buildTree } from '@shared/utils/build-tree';

import { api } from '../instance';
import { TAG_END_POINT } from './end-point';
import { TAG_KEY } from './query-key';
import { TagListApiResponse, TagNode, TagType } from './type';

/**
 * 태그 정보 조회
 * @returns 태그 정보
 */
const getTag = async (): Promise<TagListApiResponse> => {
  const response = await api.get<TagListApiResponse>(TAG_END_POINT.GET_TAG);
  return response.data;
};

const hasTagId = (tag: TagType): tag is TagNode => tag.tagId !== undefined;

/**
 * 응답에서 태그 목록을 꺼내 트리로 변환.
 */
const selectTagTree = (response: TagListApiResponse) =>
  buildTree(response.data?.tags?.filter(hasTagId) ?? [], {
    getId: (tag) => tag.tagId,
    getParentId: (tag) => tag.parentId,
  });

export const useGetTag = () => {
  return useQuery({
    queryKey: TAG_KEY.GET_ALL(),
    queryFn: getTag,
    select: selectTagTree,
  });
};
