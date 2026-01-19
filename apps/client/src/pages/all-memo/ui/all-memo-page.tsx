import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { AlertModal, FloatingButton } from '@cds/ui';

import { useLayoutUI } from '@shared/layouts/layout-ui-context';

import { AiPrompt } from '@widgets/ai-prompt';
import { Header } from '@widgets/header';
import { MemoCardGrid, MemoSelectionGrid } from '@widgets/memo-list';

import { useAllMemo } from '../hooks/use-all-memo';

import * as styles from './all-memo-page.css';

interface AllMemoPageProps {
  title?: string;
  count?: number;
}

const AllMemoPage = ({ title = '메모', count }: AllMemoPageProps) => {
  const { isAiMode, setIsAiMode, isPromptOpen, setIsPromptOpen } =
    useLayoutUI();
  const [viewMode, setViewMode] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();

  const {
    searchInput,
    filteredMemos,
    memoCount,
    handleChangeInput,
    handleSearchEnter,
    selectedCardIds,
    selectedMemos,
    handleCardClick,
    setInitialSelectedId,
  } = useAllMemo(count, isAiMode, isLoading || isPromptOpen);

  useEffect(() => {
    const state = location.state as { selectedMemoId?: string } | null;
    if (state?.selectedMemoId) {
      setInitialSelectedId(state.selectedMemoId);
      setIsAiMode(true);
      window.history.replaceState({}, '');
    }
  }, [location.state, setIsAiMode, setInitialSelectedId]);

  // AI로 정리하기 버튼 클릭 시 카드 선택 모드 진입
  const handleStartAiMode = () => {
    setIsAiMode(true);
  };

  // 정리 진행하기 버튼 클릭 시 AI 프롬프트 열기
  const handleStartPrompt = () => {
    setIsPromptOpen(true);
  };

  // AI 프롬프트 닫기 시도 시 AlertModal 표시
  const handleCloseAiPrompt = () => {
    setShowAlertModal(true);
  };

  // AlertModal 닫기
  const handleCloseAlertModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAlertModal(false);
      setIsClosing(false);
    }, 200);
  };

  // AlertModal 확인 - 상태 초기화
  const handleConfirmAlertModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAlertModal(false);
      setIsClosing(false);
      setIsPromptOpen(false);
      setIsAiMode(false);
    }, 200);
  };

  // 뷰 모드 변경 시 뷰 모드 설정
  const handleValueChange = (value: string) => {
    setViewMode(value);
  };

  // AI 모드에서 모달의 AI 생성하기 버튼 클릭 시 해당 메모 선택
  // 이미 선택된 메모는 선택 해제되지 않도록 처리
  const handleAiCreateClickInSelectionMode = (memoId: string) => {
    if (!selectedCardIds.has(memoId)) {
      handleCardClick(memoId);
    }
  };

  return (
    <div className={styles.homePageContainer({ isPromptOpen })}>
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
        {isAiMode ? (
          <MemoSelectionGrid
            memos={filteredMemos}
            selectedIds={selectedCardIds}
            onSelect={handleCardClick}
            disabled={isLoading || isPromptOpen}
            hasAiComponent={isPromptOpen}
            onAiCreateClick={handleAiCreateClickInSelectionMode}
          />
        ) : (
          <MemoCardGrid memos={filteredMemos} />
        )}
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

      {!isAiMode && (
        <div className={styles.floatingButtonContainer}>
          <FloatingButton isActive={false} handleClick={handleStartAiMode}>
            AI로 정리하기
          </FloatingButton>
        </div>
      )}

      {isAiMode && !isPromptOpen && (
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

export default AllMemoPage;
