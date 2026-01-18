import { LabelTextType } from './label-type';

interface LabelItemTypes {
  id: string;
  text: LabelTextType;
}

interface LabelListTypes {
  dateText: string;
  labelItems: LabelItemTypes[];
}

interface TextContentTypes {
  isAiResult: boolean;
  title: string;
  content: string;
}

interface ImageContainerTypes {
  imageUrl: string;
  imageAlt: string;
}

interface FileTypes {
  fileName: string;
  fileSize: string;
  fileUrl: string;
}

interface SelectedMemoTypes {
  id: number;
  memoName: string;
}

export interface MemoInfoTypes {
  id: number;
  labelList: LabelListTypes;
  textContent: TextContentTypes;
  images?: ImageContainerTypes[];
  files?: FileTypes[];
  selectedMemos?: SelectedMemoTypes[];
}
