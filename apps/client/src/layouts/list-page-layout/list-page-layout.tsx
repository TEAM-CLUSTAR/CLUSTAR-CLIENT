import { ReactNode } from 'react';

import * as styles from './list-page-layout.css';

interface ListPageLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

const ListPageLayout = ({ header, children }: ListPageLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>{header}</div>
      </div>
      <div className={styles.scrollArea}>{children}</div>
    </div>
  );
};

export default ListPageLayout;
