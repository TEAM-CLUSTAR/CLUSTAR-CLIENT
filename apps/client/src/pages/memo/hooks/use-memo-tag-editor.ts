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

const resolveTagSegments = (
  name: string,
): { childName: string; immediateParentName?: string } => {
  const segments = name.split('/').map((segment) => segment.trim());
  if (segments.length === 1 || segments.some((segment) => segment === '')) {
    return { childName: segments[segments.length - 1] };
  }

  return {
    childName: segments[segments.length - 1],
    immediateParentName: segments[segments.length - 2],
  };
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
  // 자식 목록 로딩 중에도 팝오버가 사라지지 않도록 자식 없는 트리로 임시 대체
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

  const createAndAttachTag = (
    name: string,
    parentTagId?: number,
    parentColor?: string,
  ) => {
    const tempTagId = nextLocalTagIdRef.current--;
    const tempTag: TagNode = {
      tagId: tempTagId,
      name,
      color: parentColor ?? 'blue',
      parentId: parentTagId ?? null,
    };
    addTagToMemo(tempTag);

    createTag({ name, parentTagId })
      .then((response) => {
        const createdTag = response.data;
        if (createdTag === undefined) {
          return;
        }

        editMemo({
          tagList: tagListRef.current.map((tag) =>
            tag.tagId === tempTagId ? createdTag : tag,
          ),
        });
        queryClient.invalidateQueries({ queryKey: TAG_KEY.ALL });
      })
      .catch(() => {
        editMemo({
          tagList: tagListRef.current.filter((tag) => tag.tagId !== tempTagId),
        });
      });
  };

  const createParentThenChildTag = async (
    parentName: string,
    childName: string,
  ) => {
    const tempTagId = nextLocalTagIdRef.current--;
    const tempTag: TagNode = {
      tagId: tempTagId,
      name: childName,
      color: 'blue',
      parentId: null,
    };
    addTagToMemo(tempTag);

    try {
      const parentResponse = await createTag({ name: parentName });
      const createdParent = parentResponse.data;
      if (createdParent?.tagId === undefined) {
        throw new Error('부모 태그 생성 실패');
      }
      queryClient.invalidateQueries({ queryKey: TAG_KEY.ALL });

      const childResponse = await createTag({
        name: childName,
        parentTagId: createdParent.tagId,
      });
      const createdChild = childResponse.data;
      if (createdChild === undefined) {
        throw new Error('자식 태그 생성 실패');
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

    const { childName, immediateParentName } = resolveTagSegments(trimmedName);
    if (childName === '') {
      return false;
    }

    const parentTag = immediateParentName
      ? flatTags.find(
          (tag) => tag.name.toLowerCase() === immediateParentName.toLowerCase(),
        )
      : undefined;

    const matchesResolvedTag = (tag: {
      name: string;
      parentId: number | null;
    }) =>
      tag.name.toLowerCase() === childName.toLowerCase() &&
      (parentTag === undefined || tag.parentId === parentTag.tagId);

    const isAlreadySelected = tagList.some(matchesResolvedTag);
    if (isAlreadySelected) {
      return false;
    }

    const existingTag = flatTags.find(matchesResolvedTag);
    if (existingTag) {
      addTagToMemo(existingTag);
      return true;
    }

    if (immediateParentName && !parentTag) {
      createParentThenChildTag(immediateParentName, childName);
      return true;
    }

    createAndAttachTag(childName, parentTag?.tagId, parentTag?.color);
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
