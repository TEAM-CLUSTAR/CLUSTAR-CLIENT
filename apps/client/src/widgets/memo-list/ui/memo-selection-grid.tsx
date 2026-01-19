import { Card } from '@cds/ui';

import { MockMemo } from './mock-memos';

import * as styles from './memo-card-grid.css';

interface MemoSelectionGridProps {
  memos: MockMemo[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
  disabled?: boolean;
  hasAiComponent?: boolean;
}

export const MemoSelectionGrid = ({
  memos,
  selectedIds,
  onSelect,
  disabled = false,
  hasAiComponent = false,
}: MemoSelectionGridProps) => {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.gridContainer({ hasAiComponent })}>
        {memos.map((memo) => {
          const hasImage = !!memo.imageUrl;
          const cardClassName = hasImage
            ? styles.gridItemWithImage
            : styles.gridItem;
          const isSelected = selectedIds.has(memo.id);

          return (
            <div key={memo.id} className={cardClassName}>
              <Card
                item={memo.item}
                title={memo.title}
                contents={memo.contents}
                fileCount={memo.fileCount}
                imageCount={memo.imageCount}
                date={memo.date}
                imageUrl={memo.imageUrl}
                imageAlt={memo.imageAlt}
                isAiMode={true}
                isSelectedCard={isSelected}
                aiResult={memo.aiResult}
                aiNewResult={memo.aiNewResult}
                onClick={disabled ? undefined : () => onSelect(memo.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
