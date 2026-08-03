import { useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './suggested-memo-list.css';

const MAX_SUGGESTED_MEMO_COUNT = 3;

// TODO: SuggestedMemos API의 타입으로 변경 (타입 SSOT)
interface SuggestedMemosTypes {
  memoId: number;
  title: string;
  isSelected: boolean;
}

interface SuggestedMemoListProps {
  hasUserSelectedMemo: boolean;
  memos: SuggestedMemosTypes[];
  onSelectMemo: (memoId: number) => void;
}

const SuggestedMemoList = ({
  hasUserSelectedMemo,
  memos,
  onSelectMemo,
}: SuggestedMemoListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const visibleMemos = memos.slice(0, MAX_SUGGESTED_MEMO_COUNT);
  const iconColor = isOpen ? 'blue500' : 'grey700';

  if (!hasUserSelectedMemo) return null;
  return (
    <div className={styles.container}>
      <div className={styles.listContainer({ isOpen })}>
        <Icon name="ic_ai" size={32} color={iconColor} />
        <span className={styles.title}>AI 추천 메모</span>
        <button
          type="button"
          className={styles.chevronButton({ isOpen })}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Icon name="ic_chevron_down" size={20} color={iconColor} />
        </button>
      </div>
      {isOpen && (
        <ul className={styles.itemsContainer}>
          {visibleMemos.map(({ memoId, title, isSelected }) => (
            <SuggestedMemoItem
              key={memoId}
              memoTitle={title}
              isSelected={isSelected}
              onSelectMemo={() => onSelectMemo(memoId)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

interface SuggestedMemoItemProps {
  memoTitle: string;
  isSelected: boolean;
  onSelectMemo: () => void;
}

const SuggestedMemoItem = ({
  memoTitle,
  isSelected,
  onSelectMemo,
}: SuggestedMemoItemProps) => {
  const iconColor = isSelected ? 'grey300' : 'grey700';

  return (
    <li className={styles.itemContainer({ isSelected })}>
      <Icon name="ic_memo" size={24} color="grey700" />
      <span className={styles.memo}>{memoTitle}</span>
      <button
        type="button"
        aria-label="추천 메모 선택"
        className={styles.addMemo({ isSelected })}
        onClick={onSelectMemo}
        disabled={isSelected}
      >
        <Icon name="ic_plus" size={24} color={iconColor} />
      </button>
    </li>
  );
};

export default SuggestedMemoList;
