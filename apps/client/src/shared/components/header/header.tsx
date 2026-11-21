import { ReactNode } from 'react';

import * as styles from './header.css';

interface HeaderProps {
  title: string;
  count: number;
  children?: ReactNode;
}

const Header = ({ title, count, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{count}개</span>
      </div>
      {children}
    </header>
  );
};

export default Header;
