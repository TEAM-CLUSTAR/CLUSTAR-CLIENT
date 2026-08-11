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

// 추천 메모(memos)는 서버에서 최대 3개를 보내줘요
// 프론트에서 추천 메모 개수에 대한 별도 처리 X
const SuggestedMemoList = ({ memos, onSelectMemo }: SuggestedMemoListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconColor = isOpen ? 'blue500' : 'grey700';

  return (
    <div className={styles.container}>
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
