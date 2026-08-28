import { MouseEvent, useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './suggested-memo-list.css';

export interface SuggestedMemo {
  memoId: number;
  title: string;
  isSelected: boolean;
}

interface SuggestedMemoListProps {
  memos: SuggestedMemo[];
  onSelectMemo: (memo: SuggestedMemo) => void;
  onOpenMemo?: (memoId: number) => void;
}

const SuggestedMemoList = ({
  memos,
  onSelectMemo,
  onOpenMemo,
}: SuggestedMemoListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const iconColor = isOpen ? 'blue500' : 'grey700';

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container || container.contains(e.target as Node)) return;

      setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        className={styles.listContainer({ isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <Icon name="ic_ai" size={32} color={iconColor} />
        <span className={styles.title}>AI 추천 메모</span>
        <div className={styles.chevronButton({ isOpen })}>
          <Icon name="ic_chevron_down" size={20} color={iconColor} />
        </div>
      </button>
      <ul className={styles.itemsContainer({ isOpen })}>
        {memos.map((memo) => (
          <SuggestedMemoItem
            key={memo.memoId}
            memo={memo}
            onSelectMemo={() => onSelectMemo(memo)}
            onOpenMemo={() => onOpenMemo?.(memo.memoId)}
          />
        ))}
      </ul>
    </div>
  );
};

interface SuggestedMemoItemProps {
  memo: SuggestedMemo;
  onSelectMemo: () => void;
  onOpenMemo: () => void;
}

const SuggestedMemoItem = ({
  memo,
  onSelectMemo,
  onOpenMemo,
}: SuggestedMemoItemProps) => {
  const { title, isSelected } = memo;

  const handleSelectMemo = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelectMemo();
  };

  return (
    <li className={styles.itemContainer}>
      <button
        type="button"
        className={styles.openMemo}
        aria-label={`${title} 메모 열기`}
        onClick={onOpenMemo}
      >
        <Icon name="ic_memo" size={24} color="grey700" />
        <span className={styles.memo}>{title}</span>
      </button>
      <button
        type="button"
        aria-label={
          isSelected ? `${title} 추천 메모 추가됨` : `${title} 추천 메모 추가`
        }
        className={styles.addMemo({ isSelected })}
        onClick={handleSelectMemo}
        disabled={isSelected}
      >
        <span>{isSelected ? '추가됨' : '추가하기'}</span>
        {isSelected ? (
          <Icon name="ic_check" size={16} color="white" />
        ) : (
          <Icon name="ic_plus" size={16} color="grey700" />
        )}
      </button>
    </li>
  );
};

export default SuggestedMemoList;
