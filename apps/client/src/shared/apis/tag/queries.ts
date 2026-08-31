import { mutationOptions, useQuery } from '@tanstack/react-query';

import { buildTree } from '@shared/utils/build-tree';

import { api } from '../instance';
import { TAG_END_POINT } from './end-point';
import { TAG_KEY } from './query-key';
import {
  TagCreateRequest,
  TagCreateResponse,
  TagHierarchyApiResponse,
  TagListApiResponse,
  TagNode,
  TagParentListApiResponse,
  TagType,
} from './type';

/**
 * 태그 정보 조회
 * @returns 태그 정보
 */
const getTag = async (): Promise<TagListApiResponse> => {
  const response = await api.get<TagListApiResponse>(TAG_END_POINT.GET_TAG);
  return response.data;
};

const hasTagId = (tag: TagType): tag is TagNode => tag.tagId !== undefined;

const selectTags = (tags: TagType[] | undefined) =>
  tags?.filter(hasTagId) ?? [];

const selectTagList = (response: TagListApiResponse) =>
  selectTags(response.data?.tags);

/**
 * 응답에서 태그 목록을 꺼내 트리로 변환.
 */
const selectTagTree = (response: TagListApiResponse) =>
  buildTree(selectTagList(response), {
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

/**
 * 태그 목록 조회 (평탄한 목록).
 */
export const useFlatTags = () => {
  return useQuery({
    queryKey: TAG_KEY.GET_ALL(),
    queryFn: getTag,
    select: selectTagList,
  });
};

/**
 * 부모 태그 최대 10개 조회 (생성일 내림차순)
 */
const getParentTags = async (): Promise<TagParentListApiResponse> => {
  const response = await api.get<TagParentListApiResponse>(
    TAG_END_POINT.GET_PARENT_TAGS,
  );
  return response.data;
};

export const useGetParentTags = () => {
  return useQuery({
    queryKey: TAG_KEY.GET_PARENTS(),
    queryFn: getParentTags,
    select: (response) => selectTags(response.data?.tags),
  });
};

/**
 * 부모 태그 기준 자식+손자 태그 조회
 */
const getChildTags = async (
  parentTagId: number,
): Promise<TagHierarchyApiResponse> => {
  const response = await api.get<TagHierarchyApiResponse>(
    TAG_END_POINT.GET_CHILD_TAGS(parentTagId),
  );
  return response.data;
};

/**
 * 응답의 parentTag를 루트로, childTags(자식+손자 평탄 목록)를 buildTree로 조립.
 */
const selectTagHierarchyTree = (response: TagHierarchyApiResponse) => {
  const hierarchy = response.data;
  if (hierarchy === undefined) {
    return undefined;
  }

  return {
    ...hierarchy.parentTag,
    children: buildTree(selectTags(hierarchy.childTags), {
      getId: (tag) => tag.tagId,
      getParentId: (tag) => tag.parentId,
    }),
  };
};

export const useGetChildTags = (parentTagId: number | undefined) => {
  return useQuery({
    queryKey: TAG_KEY.GET_CHILDREN(parentTagId ?? -1),
    queryFn: () => getChildTags(parentTagId as number),
    enabled: parentTagId !== undefined,
    select: selectTagHierarchyTree,
  });
};

/**
 * 태그 생성
 * @param body - 태그 이름과, 하위 태그로 만들 경우의 부모 태그 ID
 * @returns 생성된 태그 정보
 */
const createTag = async (
  body: TagCreateRequest,
): Promise<TagCreateResponse> => {
  const response = await api.post<TagCreateResponse>(
    TAG_END_POINT.POST_TAG,
    body,
  );
  return response.data;
};

export const usePostTag = () => {
  return mutationOptions({
    mutationKey: TAG_KEY.POST(),
    mutationFn: createTag,
  });
};
