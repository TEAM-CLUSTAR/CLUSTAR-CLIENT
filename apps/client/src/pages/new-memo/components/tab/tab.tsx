import { Icon } from '@cds/icon';

import * as styles from './tab.css';

interface TabProps {
  id: string;
  title?: string;
  handleDelete: () => void;
  handleSelect: () => void;
  isSelected: boolean;
  isDefault: boolean;
}

const Tab = ({
  title,
  handleSelect,
  isSelected,
  handleDelete,
  isDefault,
}: TabProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <div className={styles.tabContainer({ isSelected })}>
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
          <Icon name="ic_close" size={28} onClick={handleDeleteClick} />
        </button>
      )}
    </div>
  );
};

export default Tab;
