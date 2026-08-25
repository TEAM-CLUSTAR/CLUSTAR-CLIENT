import Card, { CardInfoType } from '@shared/components/card/card';
import { components } from '@shared/types/schema';

import * as styles from './memo-list.css';

type CardType = components['schemas']['MemoDashboardResponse'];

const CardInfo = (memo: CardType): CardInfoType => ({
  title: memo.title ?? '',
  content: memo.content ?? '',
  createdAt: memo.createdAt ?? '',
  tagList: memo.tagList,
  fileCount: memo.fileCount,
  imageCount: memo.imageCount,
  isAiGenerated: memo.isAiGenerated,
  isNew: memo.isNew,
});

interface MemoListProps {
  cards: CardType[];
  isSelected: boolean;
  isDragging: boolean;
  onClickCard: () => void;
}

const MemoList = ({
  cards,
  isSelected,
  isDragging,
  onClickCard,
}: MemoListProps) => {
  return (
    <div className={styles.memoListContainer}>
      <div className={styles.memoListGrid}>
        {cards.map((card) => (
          <Card
            key={card.memoId}
            {...CardInfo(card)}
            isSelected={isSelected}
            isDragging={isDragging}
            onClick={onClickCard}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoList;
