import MemoCard, {
  MemoCardInfoType,
} from '@pages/memos/components/memo-card/memo-card';

import { components } from '@shared/types/schema';

import * as styles from './memo-card-list.css';

type MemoCardResponse = components['schemas']['MemoDashboardResponse'];

const CardInfo = (memo: MemoCardResponse): MemoCardInfoType => ({
  title: memo.title ?? '',
  content: memo.content ?? '',
  createdAt: memo.createdAt ?? '',
  tagList: memo.tagList,
  fileCount: memo.fileCount,
  imageCount: memo.imageCount,
  isAiGenerated: memo.isAiGenerated,
  isNew: memo.isNew,
});

interface MemoCardListProps {
  cards: MemoCardResponse[];
  isSelected: boolean;
  isDragging: boolean;
  onClickCard: (memoId: number) => void;
}

const MemoCardList = ({
  cards,
  isSelected,
  isDragging,
  onClickCard,
}: MemoCardListProps) => {
  return (
    <div className={styles.memoListContainer}>
      <div className={styles.memoListGrid}>
        {cards.map((card) => (
          <MemoCard
            key={card.memoId}
            {...CardInfo(card)}
            isSelected={isSelected}
            isDragging={isDragging}
            onClick={() => onClickCard(card.memoId)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoCardList;
