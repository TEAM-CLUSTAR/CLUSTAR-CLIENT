import { DragEvent, useRef, useState } from 'react';
import {
  SelectedMemoType,
  SuggestedMemoType,
} from '@features/ai-panel/types/ai-panel.types';
import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';
import { MEMO_DRAG_DATA_FORMAT } from '@shared/constants/memo-drag-data';

import { useAiPanel } from './ai-panel-context';
import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelChat from './components/chat/ai-panel-chat/ai-panel-chat';
import MemoDropOverlay from './components/memo-drop-overlay/memo-drop-overlay';
import NewChatConfirmModal from './components/new-chat-confirm-modal/new-chat-confirm-modal';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList from './components/suggested-memo-list/suggested-memo-list';
import { useAiPanelChat } from './hooks/use-ai-panel-chat';

import * as styles from './ai-panel.css';

const AI_PANEL_TITLE_ID = 'ai-panel-title';

const isMemoDrag = (event: DragEvent<HTMLElement>) =>
  event.dataTransfer.types.includes(MEMO_DRAG_DATA_FORMAT);

interface SuggestedMemoSection {
  memos: SuggestedMemoType[];
  onSelectMemo?: (memo: SuggestedMemoType) => void;
  onOpenMemo?: (memoId: number) => void;
}

interface AiPanelProps {
  suggestedMemoSection?: SuggestedMemoSection;
}

const AiPanel = ({ suggestedMemoSection }: AiPanelProps) => {
  const { isOpen, selectedMemos, close, addMemo, removeMemo, clearMemos } =
    useAiPanel();
  const navigate = useNavigate();

  const [isDragOver, setIsDragOver] = useState(false);
  const [isNewChatConfirmModalOpen, setIsNewChatConfirmModalOpen] =
    useState(false);
  const dragDepthRef = useRef(0);

  const handleDragEnter = (event: DragEvent<HTMLElement>) => {
    if (!isMemoDrag(event)) return;
    event.preventDefault();
    dragDepthRef.current += 1;
    setIsDragOver(true);
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    if (!isMemoDrag(event)) return;
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    if (!isMemoDrag(event)) return;
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    dragDepthRef.current = 0;
    setIsDragOver(false);
    if (!isMemoDrag(event)) return;
    event.preventDefault();

    try {
      const raw = event.dataTransfer.getData(MEMO_DRAG_DATA_FORMAT);
      addMemo(JSON.parse(raw) as SelectedMemoType);
    } catch {
      // 유효한 메모 드래그 데이터가 아니면 무시
    }
  };

  const {
    messages,
    isLoading,
    isAnswerLoading,
    promptValue,
    answerGeneratingMemoCount,
    recommendedMemos,
    isSaveConfirmModalOpen,
    setIsSaveConfirmModalOpen,
    handleCreateNewChat,
    handlePromptChange,
    handleOptionSelect,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  } = useAiPanelChat({
    isOpen,
    selectedMemos,
  });

  const suggestedMemos = suggestedMemoSection?.memos ?? recommendedMemos;
  const shouldShowSuggestedMemos = suggestedMemos.length > 0;

  const handleSelectSuggestedMemo = (memo: SuggestedMemoType) => {
    addMemo(memo);
    suggestedMemoSection?.onSelectMemo?.(memo);
  };

  const handleOpenSuggestedMemo = (memo: SuggestedMemoType) => {
    suggestedMemoSection?.onOpenMemo?.(memo.memoId);
    navigate(`${PATH.MEMO}/${memo.memoId}`, { state: { title: memo.title } });
  };

  const handleOpenNewChatConfirmModal = () => {
    setIsNewChatConfirmModalOpen(true);
  };

  const handleConfirmCreateNewChat = () => {
    handleCreateNewChat();
    clearMemos();
  };

  if (!isOpen) return null;

  return (
    <aside
      className={styles.container}
      aria-labelledby={AI_PANEL_TITLE_ID}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <AiPanelHeader
        titleId={AI_PANEL_TITLE_ID}
        onCreateNewChat={handleOpenNewChatConfirmModal}
        onClose={close}
      />

      <div className={styles.content}>
        <div className={styles.chatWrapper}>
          {shouldShowSuggestedMemos && (
            <SuggestedMemoList
              memos={suggestedMemos}
              onSelectMemo={handleSelectSuggestedMemo}
              onOpenMemo={handleOpenSuggestedMemo}
            />
          )}

          <AiPanelChat
            messages={messages}
            isAnswerLoading={isAnswerLoading}
            answerGeneratingMemoCount={answerGeneratingMemoCount}
            onRegenerate={handleRegenerate}
            onSaveToMemo={handleSaveToMemo}
          />

          {isDragOver && <MemoDropOverlay />}
        </div>

        <PromptInput
          value={promptValue}
          onPromptChange={handlePromptChange}
          onOptionSelect={handleOptionSelect}
          onSubmit={handleSubmit}
          disabled={isLoading}
          selectedMemos={selectedMemos}
          onRemoveMemo={removeMemo}
        />
      </div>

      <ConfirmModal
        open={isSaveConfirmModalOpen}
        onOpenChange={setIsSaveConfirmModalOpen}
        hasCancel={false}
      />

      <NewChatConfirmModal
        open={isNewChatConfirmModalOpen}
        onOpenChange={setIsNewChatConfirmModalOpen}
        onConfirm={handleConfirmCreateNewChat}
      />
    </aside>
  );
};

export default AiPanel;
