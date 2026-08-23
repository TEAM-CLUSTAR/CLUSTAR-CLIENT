import { useEffect, useRef, useState } from 'react';

import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';

import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelMessages from './components/ai-panel-messages/ai-panel-messages';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList, {
  SuggestedMemo,
} from './components/suggested-memo-list/suggested-memo-list';
import { useAiPanelDragDrop } from './hooks/use-ai-panel-drag-drop';
import { useAiPanelScroll } from './hooks/use-ai-panel-scroll';
import { useAiPrompt } from './hooks/use-ai-prompt';
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
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);

  const {
    isOpen,
    isLoading,
    answerGeneratingMemoCount = selectedMemos.length,
    shouldShowLoadingMessage,
    visibleMessages,
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

  const dragHandlers = useAiPanelDragDrop({
    onDragOverChange,
    onDropMemo,
  });

  const { scrollbarState, updateScrollbar, handleScrollbarThumbPointerDown } =
    useAiPanelScroll({
      chatAreaRef,
      chatContentRef,
      hasSuggestedMemos,
      shouldShowLoadingMessage,
      visibleMessagesLength: visibleMessages.length,
    });

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const handleSaveToMemoWithModal = async (messageId: string) => {
    const success = await handleSaveToMemo(messageId);
    if (success) {
      setIsSaveConfirmModalOpen(true);
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      className={styles.container}
      aria-label="AI 생성하기"
      {...dragHandlers}
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
