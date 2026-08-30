export type ImageType =
  | {
      status: 'saved';
      imageId: number;
      imageUrl: string;
      imageName: string;
      imageSize: string;
    }
  | {
      status: 'uploaded';
      s3Key: string;
      imageUrl: string;
      imageName: string;
      imageSize: string;
    };

export type FileType =
  | {
      status: 'saved';
      fileId: number;
      fileUrl: string;
      fileName: string;
      fileSize: string;
    }
  | {
      status: 'uploaded';
      s3Key: string;
      fileUrl: string;
      fileName: string;
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
