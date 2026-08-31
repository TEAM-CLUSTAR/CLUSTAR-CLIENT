import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MemoType } from '@pages/memo/types/memo-type';

import { useFlatTags, useGetTag, usePostTag } from '@shared/apis/tag/queries';
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

  const { data: tagRoots = [] } = useGetTag();
  const { data: flatTags = [] } = useFlatTags();
  const [activeParentId, setActiveParentId] = useState<number>();

  const activeParent =
    tagRoots.find((root) => root.tagId === activeParentId) ?? tagRoots[0];

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

    const isAlreadySelected = tagList.some(
      (tag) => tag.name.toLowerCase() === childName.toLowerCase(),
    );
    if (isAlreadySelected) {
      return false;
    }

    const parentTag = immediateParentName
      ? flatTags.find(
          (tag) => tag.name.toLowerCase() === immediateParentName.toLowerCase(),
        )
      : undefined;

    const existingTag = flatTags.find(
      (tag) =>
        tag.name.toLowerCase() === childName.toLowerCase() &&
        (parentTag === undefined || tag.parentId === parentTag.tagId),
    );
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
    tagRoots,
    activeParent,
    setActiveParentId,
    handleToggleTag,
    handleCreateTag,
  };
};
