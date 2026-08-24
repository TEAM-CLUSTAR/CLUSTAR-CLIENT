export interface TagListTypes {
  tagId: number;
  name: string;
  color: string;
}

export interface StructureMemoTypes {
  memoId: number;
  title: string;
  content: string;
  tagList: TagListTypes[];
}
