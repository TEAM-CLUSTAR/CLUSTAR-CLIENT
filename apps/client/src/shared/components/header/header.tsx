import { PageTitle, Search } from '@cds/ui';

import * as styles from './header.css';
interface HeaderProps {
  title: string;
  count: number;
}

const Header = ({ title, count }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <PageTitle title={title} count={count} />
        <Search />
      </div>
    </header>
  );
};

export default Header;
