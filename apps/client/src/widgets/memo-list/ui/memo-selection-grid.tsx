import { useState } from 'react';

import { Card, DetailModal } from '@cds/ui';

import useSingleAndDoubleClick from '@shared/hooks/use-single-and-double-click';

import { MockMemo } from './mock-memos';

import * as styles from './memo-card-grid.css';

interface MemoSelectionGridProps {
  memos: MockMemo[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
  disabled?: boolean;
  hasAiComponent?: boolean;
  onAiCreateClick?: (memoId: string) => void;
}

export const MemoSelectionGrid = ({
  memos,
  selectedIds,
  onSelect,
  disabled = false,
  hasAiComponent = false,
  onAiCreateClick,
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
            selectedMemos,
          } = memo;

          const hasImage = !!imageUrl;
          const cardClassName = hasImage
            ? styles.gridItemWithImage
            : styles.gridItem;
          const isSelected = selectedIds.has(id);

          // AI 모드일 때: 일반 클릭은 메모 선택하기, 더블 클릭은 모달 띄우기
          const MemoSelectionItem = () => {
            const [isModalOpen, setIsModalOpen] = useState(false);

            const handleSelect = () => {
              if (!disabled) {
                onSelect(id);
              }
            };

            const handleModalOpen = () => {
              setIsModalOpen(true);
            };

            const handleClick = useSingleAndDoubleClick({
              handleSingleClick: handleSelect,
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
                  onAiCreateClick={onAiCreateClick}
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
                    isAiMode={true}
                    isSelectedCard={isSelected}
                    aiResult={aiResult}
                    aiNewResult={aiNewResult}
                    onClick={disabled ? undefined : handleClick}
                  />
                </DetailModal>
              </div>
            );
          };

          return <MemoSelectionItem key={id} />;
        })}
      </div>
    </div>
  );
};
