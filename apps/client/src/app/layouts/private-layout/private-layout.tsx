import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

import { AlertModal } from '@cds/ui';

import {
  LayoutUIProvider,
  useLayoutUI,
} from '@shared/layouts/layout-ui-context';
import { PATH } from '@shared/router/path';

import { useDeleteChatRoom } from '@widgets/memo-list-view/api/queries';
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
  const {
    isExpanded,
    toggleSidebar,
    sidebarLocked,
    setIsTreeViewOpen,
    isTreeViewOpen,
    isPromptOpen,
    setIsPromptOpen,
    setIsAiMode,
    chatRoomId,
    setChatRoomId,
  } = useLayoutUI();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { mutate: deleteChatRoom } = useDeleteChatRoom();

  const selectedId = getMenuIdByPath(location.pathname, labelId);
  const effectiveExpanded = isExpanded && !sidebarLocked;

  const handleSelect = (id: string) => {
    const path = MENU_ID_TO_PATH[id];
    navigate(path ?? `/label/${id}`);
  };

  const handleLogoClick = () => {
    if (isPromptOpen) {
      setShowAlertModal(true);
    } else {
      if (!isExpanded) {
        toggleSidebar();
      }
    }
  };

  const handleCloseAlertModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAlertModal(false);
      setIsClosing(false);
    }, 200);
  };

  const handleConfirmAlertModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (chatRoomId) {
        deleteChatRoom({ chatRoomId });
      }
      setShowAlertModal(false);
      setIsClosing(false);
      setIsPromptOpen(false);
      setIsAiMode(false);
      setChatRoomId(null);
    }, 200);
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
            setIsTreeViewOpen={setIsTreeViewOpen}
            isTreeViewOpen={isTreeViewOpen}
            onLogoClick={handleLogoClick}
          />
        </div>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>

      {showAlertModal && (
        <AlertModal
          title="대화창을 닫으시겠습니까?"
          description="대화창을 닫을시 모든 대화 내역은 삭제됩니다."
          onClose={handleCloseAlertModal}
          onConfirm={handleConfirmAlertModal}
          isClosing={isClosing}
        />
      )}
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
