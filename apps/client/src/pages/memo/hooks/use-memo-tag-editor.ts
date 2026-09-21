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

const resolveTagPath = (name: string): string[] =>
  name
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment !== '');

const toPathKey = (path: string[]) => path.join('/').toLowerCase();

const findTagByName = (
  tags: TagNode[],
  name: string,
  parentId: number | null,
) =>
  tags.find(
    (tag) =>
      tag.name.toLowerCase() === name.toLowerCase() &&
      tag.parentId === parentId,
  );

export const useMemoTagEditor = ({
  tagList,
  editMemo,
}: UseMemoTagEditorParams) => {
  const queryClient = useQueryClient();

  const { data: parentTags = [], isSuccess: isParentTagsLoaded } =
    useGetParentTags();
  const hasNoParentTags = isParentTagsLoaded && parentTags.length === 0;
  const { data: flatTags = [] } = useFlatTags();
  const [activeParentId, setActiveParentId] = useState<number>();

  const selectedParent =
    parentTags.find((tag) => tag.tagId === activeParentId) ?? parentTags[0];
  const { data: activeParentTree } = useGetChildTags(selectedParent?.tagId);
  const activeParent =
    activeParentTree ?? (selectedParent && { ...selectedParent, children: [] });

  const pendingPathKeysRef = useRef(new Set<string>());
  const tagListRef = useRef(tagList);
  tagListRef.current = tagList;
  const editMemoRef = useRef(editMemo);
  editMemoRef.current = editMemo;

  const { mutateAsync: createTag } = useMutation(usePostTag());

  const addTagToMemo = (tag: TagNode) => {
    editMemo({ tagList: [...tagList, tag] });
  };

  const handleToggleTag = (tagId: number) => {
    if (tagList.some((tag) => tag.tagId === tagId)) {
      editMemo({ tagList: tagList.filter((tag) => tag.tagId !== tagId) });
      return;
    }

    const tagToAdd = flatTags.find((tag) => tag.tagId === tagId);
    if (tagToAdd) {
      addTagToMemo(tagToAdd);
    }
  };

  const findTagByPath = (path: string[]) => {
    let parentId: number | null = null;
    let found: TagNode | undefined;

    for (const name of path) {
      found = findTagByName(flatTags, name, parentId);
      if (!found) {
        return undefined;
      }
      parentId = found.tagId;
    }

    return found;
  };

  const findRootTagId = (tagId: number): number => {
    const parentId = flatTags.find((tag) => tag.tagId === tagId)?.parentId;
    return parentId == null ? tagId : findRootTagId(parentId);
  };

  const createTagOrThrow = async (
    name: string,
    parentId: number | null,
  ): Promise<TagNode> => {
    const { data } = await createTag({
      name,
      parentTagId: parentId ?? undefined,
    });
    if (data?.tagId === undefined) {
      throw new Error();
    }

    queryClient.invalidateQueries({ queryKey: TAG_KEY.ALL });
    return { ...data, tagId: data.tagId };
  };

  const createTagAlongPath = async (path: string[]) => {
    const pathKey = toPathKey(path);
    pendingPathKeysRef.current.add(pathKey);

    const childName = path[path.length - 1];
    const ancestorNames = path.slice(0, -1);

    try {
      let parentId: number | null = null;
      let rootTagId: number | undefined;

      for (const name of ancestorNames) {
        const ancestor: TagNode =
          findTagByName(flatTags, name, parentId) ??
          (await createTagOrThrow(name, parentId));
        parentId = ancestor.tagId;
        rootTagId ??= ancestor.tagId;
      }

      const createdChild = await createTagOrThrow(childName, parentId);

      editMemoRef.current({ tagList: [...tagListRef.current, createdChild] });
      setActiveParentId(rootTagId ?? createdChild.tagId);
    } catch {
      return;
    } finally {
      pendingPathKeysRef.current.delete(pathKey);
    }
  };

  const handleCreateTag = (rawName: string) => {
    const path = resolveTagPath(rawName);
    if (path.length === 0 || path.length > MAX_TAG_DEPTH) {
      return false;
    }

    const existingTag = findTagByPath(path);
    if (existingTag) {
      if (tagList.some((tag) => tag.tagId === existingTag.tagId)) {
        return false;
      }

      addTagToMemo(existingTag);
      setActiveParentId(findRootTagId(existingTag.tagId));
      return true;
    }

    if (pendingPathKeysRef.current.has(toPathKey(path))) {
      return false;
    }

    createTagAlongPath(path);
    return true;
  };

  return {
    parentTags,
    hasNoParentTags,
    activeParent,
    setActiveParentId,
    handleToggleTag,
    handleCreateTag,
  };
};
