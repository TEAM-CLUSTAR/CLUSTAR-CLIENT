/** 트리 형태의 태그 노드 */
export type TagTreeNodeType = {
  tagId: number;
  name: string;
  colorHex: string;
  children: TagTreeNodeType[];
};
