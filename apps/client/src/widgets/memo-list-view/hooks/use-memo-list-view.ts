import { useEffect, useRef, useState } from 'react';
import { useBlocker, useLocation, useNavigate } from 'react-router';

import { useAllMemo } from '@pages/all-memo/hooks/use-all-memo';

import { useLayoutUI } from '@shared/layouts/layout-ui-context';
import { PATH } from '@shared/router/path';

import { type MockMemo } from '@widgets/memo-list/types/memo';

import { useCreateChatRoom, useDeleteChatRoom } from '../api/queries';

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
    isTreeViewOpen,
    chatRoomId,
    setChatRoomId,
  } = useLayoutUI();
  const [viewMode, setViewMode] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPromptOpenRef = useRef(isPromptOpen);
  const isResettingRef = useRef(false);

  const { mutate: createChatRoom } = useCreateChatRoom();
  const { mutate: deleteChatRoom } = useDeleteChatRoom();

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

  // isPromptOpen ref 업데이트
  useEffect(() => {
    isPromptOpenRef.current = isPromptOpen;
  }, [isPromptOpen]);

  // 페이지 이동 차단
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isPromptOpen && currentLocation.pathname !== nextLocation.pathname,
  );

  // blocker 상태에 따라 모달 표시
  useEffect(() => {
    if (
      blocker.state === 'blocked' &&
      !showAlertModal &&
      !isResettingRef.current
    ) {
      setShowAlertModal(true);
      setPendingNavigation(() => () => blocker.proceed());
    }

    if (blocker.state === 'unblocked' && isResettingRef.current) {
      isResettingRef.current = false;
    }
  }, [blocker, showAlertModal]);

  // 새로고침 감지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPromptOpenRef.current) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 메모 선택 시 모드 전환
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

  // 정리 진행하기 버튼 클릭 시 AI 채팅방 생성 후 프롬프트 열기
  const handleStartPrompt = () => {
    if (selectedMemos.length === 0) return;

    setIsLoading(true);
    createChatRoom(undefined, {
      onSuccess: (data) => {
        const roomId = data.data?.chatRoomId;
        if (roomId) {
          setChatRoomId(roomId);
        }
        setIsPromptOpen(true);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('채팅방 생성 실패:', error);
        setIsLoading(false);
      },
    });
  };

  // AI 프롬프트 닫기 시도 시 AlertModal 표시
  const handleCloseAiPrompt = () => {
    setShowAlertModal(true);
  };

  const handleOpenTreeView = () => {
    setIsTreeViewOpen(true);
  };

  // AlertModal 닫기 - 페이지 이동 취소
  const handleCloseAlertModal = () => {
    setIsClosing(true);

    if (pendingNavigation && blocker.state === 'blocked') {
      isResettingRef.current = true;
      blocker.reset();
    }
    setPendingNavigation(null);

    setTimeout(() => {
      setShowAlertModal(false);
      setIsClosing(false);
    }, 200);
  };

  // AlertModal 확인 - 상태 초기화 및 페이지 이동 진행
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

      if (pendingNavigation) {
        pendingNavigation();
        setPendingNavigation(null);
      }
      setChatRoomId(null);
    }, 200);
  };

  // 트리뷰가 닫히면 카드뷰로 전환
  useEffect(() => {
    if (!isTreeViewOpen && viewMode === 'tree') {
      setViewMode('card');
    }
  }, [isTreeViewOpen, viewMode]);

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
    chatRoomId,
  };
};
