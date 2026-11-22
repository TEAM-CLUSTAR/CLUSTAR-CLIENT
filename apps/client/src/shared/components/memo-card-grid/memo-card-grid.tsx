import { ReactNode } from 'react';

import * as styles from './memo-card-grid.css';

interface MemoCardGridProps {
  children: ReactNode;
}

const MemoCardGrid = ({ children }: MemoCardGridProps) => {
  return (
    <div className={styles.memoListContainer}>
      <div className={styles.memoListGrid}>{children}</div>
    </div>
  );
};

export default MemoCardGrid;
