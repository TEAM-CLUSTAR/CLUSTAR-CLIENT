import { PageTitle } from '@cds/ui';

import FilterButton from './filter-button/filter-button';

import * as styles from './header.css';
interface HeaderProps {
  title: string;
  count: number;
  isFilterActive: boolean;
  onOpenFilter: () => void;
}

const Header = ({
  title,
  count,
  isFilterActive,
  onOpenFilter,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <PageTitle title={title} count={count} />
        <FilterButton isActive={isFilterActive} onClick={onOpenFilter} />
      </div>
    </header>
  );
};

export default Header;
