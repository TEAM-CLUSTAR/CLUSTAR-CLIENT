import { TagDisplayInfo } from '@shared/types/tag';

export interface MemoSearchItemData {
  memoId: number;
  title: string;
  content: string;
  openedAt: string;
  tags?: TagDisplayInfo[];
}
