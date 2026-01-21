import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import {
  LayoutUIProvider,
  useLayoutUI,
} from '@shared/layouts/layout-ui-context';
import { PATH } from '@shared/router/path';

import Sidebar from '@widgets/sidebar/sidebar';

import * as styles from './private-layout.css';

const MENU_ID_TO_PATH: Record<string, string> = {
  new: PATH.NEW_MEMO,
  all: PATH.ALL_MEMO,
  ai: PATH.AI_RESULTS,
};

const getMenuIdByPath = (pathname: string, labelId?: string) => {
  if (pathname === PATH.NEW_MEMO) return 'new';
  if (pathname.startsWith(PATH.AI_RESULTS)) return 'ai';
  if (pathname.startsWith(PATH.ALL_MEMO)) return 'all';
  if (pathname.startsWith('/label/') && labelId) {
    return labelId;
  }
  return 'all';
};

function PrivateLayoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { labelId } = useParams<{ labelId?: string }>();
  const { isExpanded, toggleSidebar, sidebarLocked } = useLayoutUI();

  const selectedId = getMenuIdByPath(location.pathname, labelId);
  const effectiveExpanded = isExpanded && !sidebarLocked;

  const handleSelect = (id: string) => {
    const path = MENU_ID_TO_PATH[id];
    navigate(path ?? `/label/${id}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgLayer} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <div className={styles.sidebarContainer}>
          <Sidebar
            isExpanded={effectiveExpanded}
            onToggle={toggleSidebar}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function PrivateLayout() {
  return (
    <LayoutUIProvider>
      <PrivateLayoutContent />
    </LayoutUIProvider>
  );
}
