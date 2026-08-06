import { useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './memo-tab.css';

interface MemoTabProps {
  memoTitle: string;
  isSelected: boolean;
  onSelectTab: () => void;
  onCloseTab: () => void;
}

const MemoTab = ({
  memoTitle,
  isSelected,
  onSelectTab,
  onCloseTab,
}: MemoTabProps) => {
  // @TODO: Icon 컴포넌트를 className cn 방식으로 -> hover 등을 class로 조정
  const [isHovered, setIsHovered] = useState(false);
  const isHoverActive = isHovered && !isSelected;
  const iconColor = isHoverActive
    ? 'grey600'
    : isSelected
      ? 'blue500'
      : 'grey500';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.container({ isSelected })}
    >
      <button
        type="button"
        onClick={onSelectTab}
        aria-current={isSelected ? 'page' : undefined}
        className={styles.selectTab}
      >
        <Icon
          name="ic_memo"
          size={32}
          color={iconColor}
          className={styles.icon}
        />
        <span className={styles.memoTitle({ isSelected })}>{memoTitle}</span>
      </button>
      <button
        onClick={onCloseTab}
        type="button"
        aria-label={`${memoTitle} 탭 닫기`}
        className={styles.closeTab}
      >
        <Icon name="ic_delete" size={24} />
      </button>
    </div>
  );
};

export default MemoTab;
