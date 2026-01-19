import { Card, DetailModal } from '@cds/ui';

import { MockMemo } from './mock-memos';

import * as styles from './memo-card-grid.css';

interface MemoCardGridProps {
  memos: MockMemo[];
}

export const MemoCardGrid = ({ memos }: MemoCardGridProps) => {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.gridContainer({ hasAiComponent: false })}>
        {memos.map((memo) => {
          const {
            id,
            item,
            date,
            title,
            contents,
            fileCount,
            imageCount,
            imageUrl,
            imageAlt,
            aiResult,
            aiNewResult,
            selectedMemos,
          } = memo;

          const hasImage = !!imageUrl;
          const cardClassName = hasImage
            ? styles.gridItemWithImage
            : styles.gridItem;

          return (
            <div key={id} className={cardClassName}>
              <DetailModal
                labelList={{
                  labelItems: item,
                  dateText: date,
                }}
                textContent={{
                  isAiResult: aiResult ?? false,
                  title,
                  content: contents,
                }}
                images={
                  imageUrl
                    ? [
                        {
                          imageUrl,
                          imageAlt: imageAlt ?? '',
                        },
                      ]
                    : undefined
                }
                selectedMemos={selectedMemos}
              >
                <Card
                  item={item}
                  title={title}
                  contents={contents}
                  fileCount={fileCount}
                  imageCount={imageCount}
                  date={date}
                  imageUrl={imageUrl}
                  imageAlt={imageAlt}
                  isAiMode={false}
                  isSelectedCard={false}
                  aiResult={aiResult}
                  aiNewResult={aiNewResult}
                />
              </DetailModal>
            </div>
          );
        })}
      </div>
    </div>
  );
};
