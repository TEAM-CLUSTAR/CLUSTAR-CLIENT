import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { PATH } from '@shared/router/path';

import Sidebar from '@widgets/sidebar/sidebar';

import * as styles from './private-layout.css';

const MENU_ID_TO_PATH: Record<string, string> = {
  new: PATH.NEW_MEMO,
  all: PATH.ALL_MEMO,
  ai: PATH.AI_RESULTS,
  label: PATH.LABEL,
};

const getMenuIdByPath = (pathname: string) => {
  if (pathname.startsWith(PATH.NEW_MEMO)) return 'new';
  if (pathname.startsWith(PATH.AI_RESULTS)) return 'ai';
  if (pathname.startsWith(PATH.ALL_MEMO)) return 'all';
  if (pathname.startsWith(PATH.LABEL)) return 'label';
  return 'all';
};
export default function PrivateLayout() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedId = () => {
    return getMenuIdByPath(location.pathname);
  };

  const [selectedId, setSelectedId] = useState(getSelectedId());

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const path = MENU_ID_TO_PATH[id];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgLayer} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <Sidebar
          userId="user123"
          userEmail="user@example.com"
          isExpanded={isExpanded}
          onToggle={handleToggle}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
