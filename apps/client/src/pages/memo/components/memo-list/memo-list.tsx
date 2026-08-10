import Card from '@shared/components/card/card';
import { components } from '@shared/types/schema';

import * as styles from './memo-list.css';

type CardType = components['schemas']['MemoDashboardResponse'];

interface MemoistProps {
  cards: CardType[];
  isSelected: boolean;
  isDragging: boolean;
  onClickCard: () => void;
}

const Memoist = ({
  cards,
  isSelected,
  isDragging,
  onClickCard,
}: MemoistProps) => {
  return (
    <div className={styles.memoListContainer}>
      {cards.map((card) => (
        <Card
          key={card.memoId}
          card={{
            tagList: card.tagList,
            title: card.title ?? '',
            content: card.content ?? '',
            fileCount: card.fileCount ?? 0,
            imageCount: card.imageCount ?? 0,
            createAt: card.createdAt ?? '',
          }}
          isSelected={isSelected}
          isDragging={isDragging}
          onClick={onClickCard}
        />
      ))}
    </div>
  );
};

export default Memoist;
