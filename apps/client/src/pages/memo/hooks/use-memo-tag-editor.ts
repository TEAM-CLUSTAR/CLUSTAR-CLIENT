import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MemoType } from '@pages/memo/types/memo-type';

import {
  useFlatTags,
  useGetChildTags,
  useGetParentTags,
  usePostTag,
} from '@shared/apis/tag/queries';
import { TAG_KEY } from '@shared/apis/tag/query-key';
import { TagNode } from '@shared/apis/tag/type';

interface UseMemoTagEditorParams {
  tagList: MemoType['tagList'];
  editMemo: (changes: Partial<MemoType>) => void;
}

const MAX_TAG_DEPTH = 3;

const resolveTagPath = (name: string): string[] => {
  const segments = name.split('/').map((segment) => segment.trim());
  if (segments.some((segment) => segment === '')) {
    return [segments[segments.length - 1]];
  }

  return segments;
};

export const useMemoTagEditor = ({
  tagList,
  editMemo,
}: UseMemoTagEditorParams) => {
  const queryClient = useQueryClient();

  const { data: parentTags = [] } = useGetParentTags();
  const { data: flatTags = [] } = useFlatTags();
  const [activeParentId, setActiveParentId] = useState<number>();

  const isActiveParentValid = parentTags.some(
    (tag) => tag.tagId === activeParentId,
  );
  const selectedParentId = isActiveParentValid
    ? activeParentId
    : parentTags[0]?.tagId;
  const selectedParent = parentTags.find(
    (tag) => tag.tagId === selectedParentId,
  );
  const { data: activeParentTree } = useGetChildTags(selectedParentId);
  const activeParent =
    activeParentTree ?? (selectedParent && { ...selectedParent, children: [] });

  const nextLocalTagIdRef = useRef(-1);
  const tagListRef = useRef(tagList);
  tagListRef.current = tagList;

  const { mutateAsync: createTag } = useMutation(usePostTag());

  const handleToggleTag = (tagId: number) => {
    const isSelected = tagList.some((tag) => tag.tagId === tagId);

    if (isSelected) {
      editMemo({ tagList: tagList.filter((tag) => tag.tagId !== tagId) });
      return;
    }

    const tagToAdd = flatTags.find((tag) => tag.tagId === tagId);
    if (!tagToAdd) {
      return;
    }
    editMemo({ tagList: [...tagList, tagToAdd] });
  };

  const addTagToMemo = (tag: TagNode) => {
    editMemo({ tagList: [...tagList, tag] });
  };

  const resolveAncestorParentId = (ancestorNames: string[]) => {
    let parentId: number | null = null;
    for (const name of ancestorNames) {
      const found = flatTags.find(
        (tag) =>
          tag.name.toLowerCase() === name.toLowerCase() &&
          tag.parentId === parentId,
      );
      if (!found) {
        return undefined;
      }
      parentId = found.tagId;
    }
    return parentId;
  };

  const createTagAlongPath = async (
    path: string[],
    resolvedParentId: number | null | undefined,
  ) => {
    const childName = path[path.length - 1];
    const ancestorNames = path.slice(0, -1);

    const immediateParent =
      resolvedParentId != null
        ? flatTags.find((tag) => tag.tagId === resolvedParentId)
        : undefined;

    const tempTagId = nextLocalTagIdRef.current--;
    const tempTag: TagNode = {
      tagId: tempTagId,
      name: childName,
      color: immediateParent?.color ?? 'blue',
      parentId: null,
    };
    addTagToMemo(tempTag);

    try {
      let parentId = resolvedParentId;

      if (parentId === undefined) {
        parentId = null;
        for (const name of ancestorNames) {
          const existingAncestor = flatTags.find(
            (tag) =>
              tag.name.toLowerCase() === name.toLowerCase() &&
              tag.parentId === parentId,
          );

          if (existingAncestor) {
            parentId = existingAncestor.tagId;
            continue;
          }

          const response = await createTag({
            name,
            parentTagId: parentId ?? undefined,
          });
          const createdAncestor = response.data;
          if (createdAncestor?.tagId === undefined) {
            throw new Error('상위 태그 생성 실패');
          }
          queryClient.invalidateQueries({ queryKey: TAG_KEY.ALL });
          parentId = createdAncestor.tagId;
        }
      }

      const childResponse = await createTag({
        name: childName,
        parentTagId: parentId ?? undefined,
      });
      const createdChild = childResponse.data;
      if (createdChild === undefined) {
        throw new Error('태그 생성 실패');
      }

      editMemo({
        tagList: tagListRef.current.map((tag) =>
          tag.tagId === tempTagId ? createdChild : tag,
        ),
      });
      queryClient.invalidateQueries({ queryKey: TAG_KEY.ALL });
    } catch {
      editMemo({
        tagList: tagListRef.current.filter((tag) => tag.tagId !== tempTagId),
      });
    }
  };

  const handleCreateTag = (rawName: string) => {
    const trimmedName = rawName.trim();
    if (trimmedName === '') {
      return false;
    }

    const path = resolveTagPath(trimmedName);
    const childName = path[path.length - 1];
    if (childName === '' || path.length > MAX_TAG_DEPTH) {
      return false;
    }

    const ancestorNames = path.slice(0, -1);
    const resolvedParentId = resolveAncestorParentId(ancestorNames);

    const matchesResolvedTag = (tag: {
      name: string;
      parentId: number | null;
    }) =>
      resolvedParentId !== undefined &&
      tag.name.toLowerCase() === childName.toLowerCase() &&
      tag.parentId === resolvedParentId;

    const isAlreadySelected = tagList.some(matchesResolvedTag);
    if (isAlreadySelected) {
      return false;
    }

    const existingTag = flatTags.find(matchesResolvedTag);
    if (existingTag) {
      addTagToMemo(existingTag);
      return true;
    }

    createTagAlongPath(path, resolvedParentId);
    return true;
  };

  return {
    parentTags,
    activeParent,
    setActiveParentId,
    handleToggleTag,
    handleCreateTag,
  };
};
