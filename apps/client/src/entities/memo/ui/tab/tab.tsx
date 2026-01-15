import { CSSProperties } from 'react';

import { Icon } from '@cds/icon';

import { PRIMARY_COLOR_VALUE_BY_LABEL_COLOR } from '@shared/constants/label-match';
import { LABEL_COLOR_BY_TEXT, LabelTextType } from '@shared/types/label-type';

import * as styles from './tab.css';

interface TabProps {
  id: string;
  title?: string;
  label: LabelTextType;
  handleDelete: () => void;
  handleSelect: () => void;
  isSelected: boolean;
  isDeleteTab: boolean;
}

const Tab = ({
  title = 'untitled',
  label,
  handleSelect,
  isSelected,
  handleDelete,
  isDeleteTab,
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
      {isDeleteTab && (
        <button>
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
