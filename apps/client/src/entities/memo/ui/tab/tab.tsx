import { CSSProperties } from 'react';

import { Icon } from '@cds/icon';

import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
  PRIMARY_COLOR_VALUE_BY_LABEL_COLOR,
} from '@entities/memo/models/constant';

import * as styles from './tab.css';

interface TabProps {
  title?: string;
  label: LabelTextType;
  handleDelete: () => void;
  handleSelect: () => void;
  isSelected: boolean;
}

const Tab = ({
  title = 'untitled',
  label,
  handleSelect,
  isSelected,
  handleDelete,
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
      <button className={styles.buttonTextContainer} onClick={handleSelect}>
        {title}
      </button>

      <button>
        <Icon
          name="ic_close"
          width={28}
          height={28}
          onClick={handleDeleteClick}
        />
      </button>
    </div>
  );
};

export default Tab;
