type ImageType = {
  imageId: number;
  imageUrl: string;
  imageName: string;
  imageExtension: string;
  imageSize: string;
};

export type FileType = {
  fileId: number;
  fileUrl: string;
  fileName: string;
  fileExtension: string;
  fileSize: string;
};

export type TagType = {
  tagId: number;
  name: string;
  color: string;
  parentId: number | null;
};

export type MemoType = {
  memoId: number | null;
  title: string;
  content: string;
  images: ImageType[];
  files: FileType[];
  tagList: TagType[];
  createdAt: string;
  updatedAt: string;
  isAiGenerated: boolean;
  sourceMemoTitleList: string[];
};
