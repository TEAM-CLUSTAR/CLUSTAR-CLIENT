import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAllMemo } from '@pages/all-memo/hooks/use-all-memo';

import { useLayoutUI } from '@shared/layouts/layout-ui-context';
import { PATH } from '@shared/router/path';

import { MockMemo } from '@widgets/memo-list/ui/mock-memos';

export interface MemoListViewHelpers {
  setIsAiMode: (value: boolean) => void;
  selectFunction: (id: string) => void;
}

interface UseMemoListViewProps {
  count?: number;
  initialMemos?: MockMemo[];
  onAiCreateClick?: (memoId: string, helpers: MemoListViewHelpers) => void;
}

export const useMemoListView = ({
  count,
  initialMemos,
  onAiCreateClick,
}: UseMemoListViewProps) => {
  const {
    isAiMode,
    setIsAiMode,
    isPromptOpen,
    setIsPromptOpen,
    setIsTreeViewOpen,
  } = useLayoutUI();
  const [viewMode, setViewMode] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    addSelectedId,
  } = useAllMemo(count, isAiMode, isLoading || isPromptOpen, initialMemos);

  useEffect(() => {
    const state = location.state as { selectedMemoId?: string } | null;
    if (state?.selectedMemoId) {
      setInitialSelectedId(state.selectedMemoId);
      setIsAiMode(true);
      window.history.replaceState({}, '');
    }
  }, [location.state, setIsAiMode, setInitialSelectedId]);

  // 일반 모드에서 모달의 AI 생성하기 버튼 클릭 시 해당 메모 선택하고 AI 모드로 전환
  // prop으로 전달된 함수가 있으면 사용하고, 없으면 기본 동작 (전체 메모 페이지로 이동)
  const handleAiCreateClick = (memoId: string) => {
    if (onAiCreateClick) {
      const selectFunction = isAiMode ? addSelectedId : setInitialSelectedId;
      onAiCreateClick(memoId, {
        setIsAiMode,
        selectFunction,
      });
    } else {
      navigate(PATH.ALL_MEMO, {
        state: { selectedMemoId: memoId },
      });
    }
  };

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

  const handleOpenTreeView = () => {
    setIsTreeViewOpen(true);
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

    if (value === 'tree') setIsTreeViewOpen(true);
    else setIsTreeViewOpen(false);
  };

  return {
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
    handleOpenTreeView,
    setIsLoading,
  };
};
