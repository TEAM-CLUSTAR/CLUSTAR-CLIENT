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
          const {
            id,
            item,
            title,
            contents,
            fileCount,
            imageCount,
            date,
            imageUrl,
            imageAlt,
            aiResult,
            aiNewResult,
          } = memo;

          const hasImage = !!imageUrl;
          const cardClassName = hasImage
            ? styles.gridItemWithImage
            : styles.gridItem;
          const isSelected = selectedIds.has(id);

          return (
            <div key={id} className={cardClassName}>
              <Card
                item={item}
                title={title}
                contents={contents}
                fileCount={fileCount}
                imageCount={imageCount}
                date={date}
                imageUrl={imageUrl}
                imageAlt={imageAlt}
                isAiMode={true}
                isSelectedCard={isSelected}
                aiResult={aiResult}
                aiNewResult={aiNewResult}
                onClick={disabled ? undefined : () => onSelect(id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
