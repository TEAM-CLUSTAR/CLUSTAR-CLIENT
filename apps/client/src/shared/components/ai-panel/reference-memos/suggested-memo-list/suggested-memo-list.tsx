import { useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './suggested-memo-list.css';

// TODO: SuggestedMemos API의 타입으로 변경 (타입 SSOT)
interface SuggestedMemosTypes {
  memoId: number;
  title: string;
  isSelected: boolean;
}

interface SuggestedMemoListProps {
  memos: SuggestedMemosTypes[];
  onSelectMemo: (memoId: number) => void;
}

const SuggestedMemoList = ({ memos, onSelectMemo }: SuggestedMemoListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconColor = isOpen ? 'blue500' : 'grey700';

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
          {memos.map(({ memoId, title, isSelected }) => (
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
        aria-label={`${memoTitle} 추천 메모 추가`}
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
