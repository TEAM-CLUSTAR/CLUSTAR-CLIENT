import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Card, DetailModal } from '@cds/ui';

import useSingleAndDoubleClick from '@shared/hooks/use-single-and-double-click';
import { PATH } from '@shared/router/path';

import { MockMemo } from './mock-memos';

import * as styles from './memo-card-grid.css';

interface MemoCardGridProps {
  memos: MockMemo[];
}

export const MemoCardGrid = ({ memos }: MemoCardGridProps) => {
  const navigate = useNavigate();

  const handleAiCreateClick = (memoId: string) => {
    navigate(PATH.ALL_MEMO, {
      state: { selectedMemoId: memoId },
    });
  };

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

          const MemoCardItem = () => {
            const [isModalOpen, setIsModalOpen] = useState(false);

            const handleModalOpen = () => {
              setIsModalOpen(true);
            };

            const handleClick = useSingleAndDoubleClick({
              handleSingleClick: handleModalOpen,
              handleDoubleClick: handleModalOpen,
            });

            return (
              <div className={cardClassName}>
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
                  memoId={id}
                  onAiCreateClick={handleAiCreateClick}
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
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
                    onClick={handleClick}
                  />
                </DetailModal>
              </div>
            );
          };

          return <MemoCardItem key={id} />;
        })}
      </div>
    </div>
  );
};
