import { AlertModal, FloatingButton } from '@cds/ui';

import { AiPrompt } from '@widgets/ai-prompt';
import { Header } from '@widgets/header';
import { MemoCardGrid } from '@widgets/memo-list';
import { type MockMemo } from '@widgets/memo-list/types/memo';
import { TreeView } from '@widgets/tree-view';

import {
  type MemoListViewHelpers,
  useMemoListView,
} from '../hooks/use-memo-list-view';

import * as styles from './memo-list-view.css';

export interface MemoListViewProps {
  title?: string;
  count?: number;
  initialMemos?: MockMemo[];
  onAiCreateClick?: (memoId: string, helpers: MemoListViewHelpers) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  totalCount?: number;
}

const MemoListView = ({
  title = '전체 메모',
  count,
  initialMemos,
  onAiCreateClick,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  totalCount,
}: MemoListViewProps) => {
  const {
    viewMode,
    isLoading,
    showAlertModal,
    isClosing,
    isPromptOpen,
    isAiMode,
    searchInput,
    filteredMemos,
    memoCount,
    selectedCardIds,
    selectedMemos,
    handleChangeInput,
    handleSearchEnter,
    handleCardClick,
    handleAiCreateClick,
    handleStartAiMode,
    handleStartPrompt,
    handleCloseAiPrompt,
    handleCloseAlertModal,
    handleConfirmAlertModal,
    handleValueChange,
    setIsLoading,
    chatRoomId,
  } = useMemoListView({
    count,
    initialMemos,
    onAiCreateClick,
  });

  const isCard = viewMode === 'card';

  return (
    <div className={styles.container({ isPromptOpen })}>
      <div
        className={styles.contentWrapper({
          isPromptOpen,
          isCard,
        })}
      >
        <Header
          title={title}
          count={totalCount ?? memoCount}
          inputValue={searchInput}
          handleChangeInput={handleChangeInput}
          viewMode={viewMode}
          handleValueChange={handleValueChange}
          isAiMode={isPromptOpen}
          onSearchEnter={handleSearchEnter}
        />
        {viewMode === 'card' && (
          <MemoCardGrid
            memoData={filteredMemos}
            isAiMode={isAiMode}
            selectedIds={selectedCardIds}
            onAiSelectToggle={handleCardClick}
            hasAiComponent={isPromptOpen}
            disabled={isLoading || isPromptOpen}
            onAiCreateClick={handleAiCreateClick}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
        {viewMode === 'tree' && <TreeView />}
      </div>

      {isPromptOpen && (
        <div className={styles.aiPromptContainer}>
          <AiPrompt
            isAIOpen={isPromptOpen}
            selectedMemos={selectedMemos}
            handleClose={handleCloseAiPrompt}
            onLoadingChange={setIsLoading}
            chatRoomId={chatRoomId}
          />
        </div>
      )}

      {!isAiMode && viewMode === 'card' && (
        <div className={styles.floatingButtonContainer}>
          <FloatingButton isActive={false} handleClick={handleStartAiMode}>
            AI로 정리하기
          </FloatingButton>
        </div>
      )}

      {isAiMode && !isPromptOpen && viewMode === 'card' && (
        <div className={styles.floatingButtonContainer}>
          <FloatingButton
            isActive={true}
            disabled={selectedMemos.length === 0}
            handleClick={handleStartPrompt}
          >
            정리 진행하기
          </FloatingButton>
        </div>
      )}

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
};

export default MemoListView;
