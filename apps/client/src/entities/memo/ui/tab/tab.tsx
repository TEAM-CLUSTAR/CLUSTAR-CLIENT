import { CSSProperties } from 'react';

import { Icon } from '@cds/icon';

import {
  LABEL_COLOR_BY_TEXT,
  PRIMARY_COLOR_VALUE_BY_LABEL_COLOR,
} from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';

import * as styles from './tab.css';

interface TabProps {
  id: string;
  title?: string;
  label: LabelTextType;
  handleDelete: () => void;
  handleSelect: () => void;
  isSelected: boolean;
  isDefault: boolean;
}

const Tab = ({
  title = 'untitled',
  label,
  handleSelect,
  isSelected,
  handleDelete,
  isDefault,
}: TabProps) => {
  const labelColor = LABEL_COLOR_BY_TEXT[label];
  const primaryColorValue = PRIMARY_COLOR_VALUE_BY_LABEL_COLOR[labelColor];

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <div
      className={styles.tabContainer({ isSelected })}
      style={{ [styles.PRIMARY_COLOR_VAR]: primaryColorValue } as CSSProperties}
    >
      <button
        type="button"
        className={styles.buttonTextContainer}
        onClick={handleSelect}
        aria-current={isSelected ? 'page' : undefined}
      >
        {title}
      </button>
      {isDefault && isSelected && (
        <button
          className={styles.deleteButton}
          type="button"
          aria-label="탭 닫기"
        >
          <Icon
            name="ic_close"
            width={28}
            height={28}
            onClick={handleDeleteClick}
          />
        </button>
      )}
    </div>
  );
};

export default Tab;
