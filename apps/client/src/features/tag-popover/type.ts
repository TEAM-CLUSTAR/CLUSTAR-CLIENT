import { TagNode } from '@shared/apis/tag/type';

export interface TagInputFieldProps {
  selectedTags: TagNode[];
  onRemoveTag: (tagId: number) => void;
  isOpen: boolean;
  onFocus: () => void;
  onEnter?: (value: string) => boolean;
}
