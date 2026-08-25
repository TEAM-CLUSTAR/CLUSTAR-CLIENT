import { PageTitle } from '@cds/ui';

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
  chips: FilterChip[];
  onRemoveFilter: (tagId: number) => void;
}

const Header = ({
  title,
  count,
  isFilterActive,
  onOpenFilter,
  chips,
  onRemoveFilter,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleFilterRow}>
        <PageTitle title={title} count={count} />
        <FilterButton isActive={isFilterActive} onClick={onOpenFilter} />
      </div>
      <FilterChipList chips={chips} onRemove={onRemoveFilter} />
    </header>
  );
};

export default Header;
