import { Outlet } from 'react-router';

import Sidebar from '@shared/components/sidebar/sidebar';

import * as styles from './private-layout.css';

export default function PrivateLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.bgLayer} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
