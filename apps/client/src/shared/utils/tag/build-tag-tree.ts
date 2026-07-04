import { TagTreeNodeType } from '@shared/types/tag';
import { buildTree } from '@shared/utils/build-tree';

/** 서버 응답의 평면(flat) 태그 형태 */
interface TagProps {
  tagId: number;
  name: string;
  colorHex: string;
  parentId: number | null;
}

/** 평면 태그 목록을 트리로 변환 */
export const buildTagTree = (tags: TagProps[]): TagTreeNodeType[] =>
  buildTree(tags, {
    getId: (tag) => tag.tagId,
    getParentId: (tag) => tag.parentId,
  });
