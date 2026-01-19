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
          const hasImage = !!memo.imageUrl;
          const cardClassName = hasImage
            ? styles.gridItemWithImage
            : styles.gridItem;

          return (
            <div key={memo.id} className={cardClassName}>
              <DetailModal
                labelList={{
                  labelItems: memo.item,
                  dateText: memo.date,
                }}
                textContent={{
                  isAiResult: memo.aiResult ?? false,
                  title: memo.title,
                  content: memo.contents,
                }}
                images={
                  memo.imageUrl
                    ? [
                        {
                          imageUrl: memo.imageUrl,
                          imageAlt: memo.imageAlt ?? '',
                        },
                      ]
                    : undefined
                }
                selectedMemos={memo.selectedMemos}
              >
                <Card
                  item={memo.item}
                  title={memo.title}
                  contents={memo.contents}
                  fileCount={memo.fileCount}
                  imageCount={memo.imageCount}
                  date={memo.date}
                  imageUrl={memo.imageUrl}
                  imageAlt={memo.imageAlt}
                  isAiMode={false}
                  isSelectedCard={false}
                  aiResult={memo.aiResult}
                  aiNewResult={memo.aiNewResult}
                />
              </DetailModal>
            </div>
          );
        })}
      </div>
    </div>
  );
};
