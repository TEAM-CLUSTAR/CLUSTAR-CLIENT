export interface LabelListTypes {
  labelId: number;
  name: string;
}

export interface StructureMemoTypes {
  memoId: number;
  title: string;
  content: string;
  labelList: LabelListTypes[];
}
