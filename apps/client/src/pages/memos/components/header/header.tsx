import FilterButton from './filter-button/filter-button';
import FilterChipList from './filter-chip-list/filter-chip-list';

import * as styles from './header.css';

type FilterChip = {
  id: number;
  tagName: string;
};

interface HeaderProps {
  title: string;
  count: number;
  isFilterActive: boolean;
  onOpenFilter: () => void;
  filterChips: FilterChip[];
  onRemoveFilter: (tagId: number) => void;
}

const Header = ({
  title,
  count,
  isFilterActive,
  onOpenFilter,
  filterChips,
  onRemoveFilter,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleFilterRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{count}</span>
        </div>
        <FilterButton isActive={isFilterActive} onClick={onOpenFilter} />
      </div>
      <FilterChipList chips={filterChips} onRemoveFilter={onRemoveFilter} />
    </header>
  );
};

export default Header;
