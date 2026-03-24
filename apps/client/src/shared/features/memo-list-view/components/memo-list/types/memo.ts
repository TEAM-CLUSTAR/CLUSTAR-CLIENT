import { formatDate } from '@shared/libs/format-date';
import { LabelTextType } from '@shared/types/label-type';
import { components } from '@shared/types/schema';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface SelectedMemo {
  id: number;
  memoName: string;
}

export interface MockMemo {
  id: string;
  item: LabelItem[];
  title: string;
  contents: string;
  fileCount: number;
  imageCount: number;
  aiResult?: boolean;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
  isSelectedCard?: boolean;
  aiNewResult?: boolean;
  selectedMemos?: SelectedMemo[];
}

type ApiMemo = components['schemas']['MemoDashboardResponse'];
type LabelResponse = components['schemas']['LabelResponse'];

const toLabelTextType = (name: string): LabelTextType => {
  return name as LabelTextType;
};

export const mapApiMemoToMockMemo = (m: ApiMemo): MockMemo => {
  const labels: LabelResponse[] = m.labelList ?? [];

  return {
    id: String(m.memoId ?? ''),
    item: labels.map((l: LabelResponse) => ({
      id: String(l.labelId ?? ''),
      text: toLabelTextType(l.name ?? ''),
    })),
    title: m.title ?? '',
    contents: m.content ?? '',
    fileCount: m.fileCount ?? 0,
    imageCount: m.imageCount ?? 0,
    aiResult: m.isAiGenerated ?? false,
    date: formatDate(m.createdAt ?? ''),
    imageUrl: m.representativeImageUrl ?? undefined,
    imageAlt: undefined,
    isSelectedCard: false,
    aiNewResult: m.isNew ?? false,
    selectedMemos: [],
  };
};
