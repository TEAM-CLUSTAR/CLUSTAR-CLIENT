import { DragEvent, useEffect, useRef, useState } from 'react';

import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';
import { MEMO_DRAG_DATA_KEY } from '@shared/constants/memo-drag';

import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelMessages from './components/ai-panel-messages/ai-panel-messages';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList, {
  SuggestedMemo,
} from './components/suggested-memo-list/suggested-memo-list';
import { useAiPrompt } from './hooks/use-ai-prompt';
import { useCustomScrollbar } from './hooks/use-custom-scrollbar';
import { SelectedMemoType } from './types/prompt-input';

import * as styles from './ai-panel.css';

interface AiPanelProps {
  isAIOpen: boolean;
  selectedMemos: SelectedMemoType[];
  handleClose: () => void;
  onRemoveMemo: (memoId: number) => void;
  isDragOver: boolean;
  chatRoomId?: number | null;
  suggestedMemos?: SuggestedMemo[];
  onSelectSuggestedMemo?: (memoId: number) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onDragOverChange?: (isDragOver: boolean) => void;
  onDropMemo?: (memoId: number) => void;
}

const MIN_SCROLL_THUMB_HEIGHT = 4;
const MIN_LOADING_MESSAGE_DURATION = 800;

const AiPanel = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  onRemoveMemo,
  isDragOver,
  chatRoomId,
  suggestedMemos = [],
  onSelectSuggestedMemo,
  onLoadingChange,
  onDragOverChange,
  onDropMemo,
}: AiPanelProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const loadingStartedAtRef = useRef<number | null>(null);
  const dragDepthRef = useRef(0);
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);
  const [isLoadingMessageVisible, setIsLoadingMessageVisible] = useState(false);
  const { scrollbarState, updateScrollbar, handleScrollbarThumbPointerDown } =
    useCustomScrollbar({
      scrollElementRef: chatAreaRef,
      contentElementRef: chatContentRef,
      minThumbHeight: MIN_SCROLL_THUMB_HEIGHT,
    });

  const {
    isOpen,
    messages,
    isLoading,
    isAnswerGenerating,
    answerGeneratingMemoCount = selectedMemos.length,
    answerGeneratingMessageId = null,
    handleClose: handlePanelClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
    handleCreateNewChat,
  } = useAiPrompt({
    isAIOpen,
    selectedMemos,
    handleClose,
    chatRoomId,
  });

  const hasSuggestedMemos = suggestedMemos.length > 0;
  const shouldShowLoadingMessage =
    isAnswerGenerating || isLoadingMessageVisible;
  const visibleMessages = shouldShowLoadingMessage
    ? messages.filter((message) => message.id !== answerGeneratingMessageId)
    : messages;

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    if (isAnswerGenerating) {
      loadingStartedAtRef.current = Date.now();
      setIsLoadingMessageVisible(true);
      return;
    }

    if (!loadingStartedAtRef.current) {
      setIsLoadingMessageVisible(false);
      return;
    }

    const elapsedTime = Date.now() - loadingStartedAtRef.current;
    const remainingTime = Math.max(
      MIN_LOADING_MESSAGE_DURATION - elapsedTime,
      0,
    );

    const timeoutId = window.setTimeout(() => {
      setIsLoadingMessageVisible(false);
      loadingStartedAtRef.current = null;
    }, remainingTime);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAnswerGenerating]);

  useEffect(() => {
    updateScrollbar();
  }, [messages, shouldShowLoadingMessage, hasSuggestedMemos, updateScrollbar]);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea || visibleMessages.length === 0) return;

    const timeoutId = window.setTimeout(() => {
      chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth',
      });
      updateScrollbar();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visibleMessages.length, shouldShowLoadingMessage, updateScrollbar]);

  const handleSaveToMemoWithModal = async (messageId: string) => {
    const success = await handleSaveToMemo(messageId);
    if (success) {
      setIsSaveConfirmModalOpen(true);
    }
  };

  const handleDragEnter = () => {
    dragDepthRef.current += 1;
    onDragOverChange?.(true);
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    onDragOverChange?.(true);
  };

  const handleDragLeave = () => {
    dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0);

    if (dragDepthRef.current === 0) {
      onDragOverChange?.(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    dragDepthRef.current = 0;
    onDragOverChange?.(false);

    const memoId =
      Number(event.dataTransfer.getData(MEMO_DRAG_DATA_KEY)) ||
      Number(event.dataTransfer.getData('text/plain'));

    if (!Number.isNaN(memoId) && memoId > 0) {
      onDropMemo?.(memoId);
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      className={styles.container}
      aria-label="AI 생성하기"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <AiPanelHeader
        onClose={handlePanelClose}
        onCreateNewChat={handleCreateNewChat}
      />
      <div className={styles.content}>
        {hasSuggestedMemos && onSelectSuggestedMemo && (
          <SuggestedMemoList
            memos={suggestedMemos}
            onSelectMemo={onSelectSuggestedMemo}
          />
        )}

        <div className={styles.chatAreaViewport}>
          <div
            ref={chatAreaRef}
            className={styles.chatArea}
            onScroll={updateScrollbar}
          >
            <div ref={chatContentRef} className={styles.chatContent}>
              <AiPanelMessages
                answerGeneratingMemoCount={answerGeneratingMemoCount}
                isDragOver={isDragOver}
                messages={visibleMessages}
                onRegenerate={handleRegenerate}
                onSaveToMemo={handleSaveToMemoWithModal}
                shouldShowLoadingMessage={shouldShowLoadingMessage}
              />
            </div>
          </div>
          {scrollbarState.isVisible && (
            <div className={styles.scrollbar} aria-hidden="true">
              <div
                className={styles.scrollbarThumb}
                style={{
                  height: `${scrollbarState.thumbHeight}px`,
                  transform: `translateY(${scrollbarState.thumbTop}px)`,
                }}
                onPointerDown={handleScrollbarThumbPointerDown}
              />
            </div>
          )}
        </div>

        <PromptInput
          key={chatRoomId}
          onSubmit={handleSubmit}
          disabled={isLoading}
          selectedMemos={selectedMemos}
          onRemoveMemo={onRemoveMemo}
          isDragOver={isDragOver}
        />
      </div>

      <ConfirmModal
        open={isSaveConfirmModalOpen}
        onOpenChange={setIsSaveConfirmModalOpen}
        hasCancel={false}
      />
    </aside>
  );
};

export default AiPanel;
