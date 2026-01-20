import { AlertModal, FloatingButton } from '@cds/ui';

import { treeViewDummy } from '@pages/all-memo/api/tree-view-dummy';

import { AiPrompt } from '@widgets/ai-prompt';
import { Header } from '@widgets/header';
import CardGridList from '@widgets/memo-list/ui/memo-card-grid';
import { MockMemo } from '@widgets/memo-list/ui/mock-memos';
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
}

const MemoListView = ({
  title = '전체 메모',
  count,
  initialMemos,
  onAiCreateClick,
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
  } = useMemoListView({
    count,
    initialMemos,
    onAiCreateClick,
  });

  return (
    <div className={styles.container({ isPromptOpen })}>
      <div className={styles.contentWrapper({ isPromptOpen })}>
        <Header
          title={title}
          count={memoCount}
          inputValue={searchInput}
          handleChangeInput={handleChangeInput}
          viewMode={viewMode}
          handleValueChange={handleValueChange}
          isAiMode={isPromptOpen}
          onSearchEnter={handleSearchEnter}
        />
        {viewMode === 'card' && (
          <CardGridList
            memoData={filteredMemos}
            isAiMode={isAiMode}
            selectedIds={selectedCardIds}
            onAiSelectToggle={handleCardClick}
            hasAiComponent={isPromptOpen}
            disabled={isLoading || isPromptOpen}
            onAiCreateClick={handleAiCreateClick}
          />
        )}
        {viewMode === 'tree' && <TreeView data={treeViewDummy} />}
      </div>

      {isPromptOpen && (
        <div className={styles.aiPromptContainer}>
          <AiPrompt
            isAIOpen={isPromptOpen}
            selectedMemos={selectedMemos}
            handleClose={handleCloseAiPrompt}
            onLoadingChange={setIsLoading}
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
