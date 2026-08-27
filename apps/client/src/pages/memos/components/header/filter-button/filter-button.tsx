import { Icon } from '@cds/icon';

import * as styles from './filter-button.css';

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ isActive, onClick }: FilterButtonProps) => {
  return (
    <button
      type="button"
      className={styles.filterButton({ isActive })}
      onClick={onClick}
      aria-label="필터링"
      aria-pressed={isActive}
    >
      <Icon
        name="ic_filter"
        size={28}
        color={isActive ? 'blue500' : 'grey700'}
      />
      <p className={styles.label({ isActive })}>필터링</p>
    </button>
  );
};

export default FilterButton;
