import { DragEvent, useRef, useState } from 'react';
import { SelectedMemoType } from '@features/ai-panel/types/ai-panel.types';

import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';
import { MEMO_DRAG_DATA_FORMAT } from '@shared/constants/memo-drag-data';

import { useAiPanel } from './ai-panel-context';
import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelChat from './components/chat/ai-panel-chat/ai-panel-chat';
import MemoDropOverlay from './components/memo-drop-overlay/memo-drop-overlay';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList, {
  SuggestedMemo,
} from './components/suggested-memo-list/suggested-memo-list';
import { useAiPanelChat } from './hooks/use-ai-panel-chat';

import * as styles from './ai-panel.css';

const AI_PANEL_TITLE_ID = 'ai-panel-title';

const isMemoDrag = (event: DragEvent<HTMLElement>) =>
  event.dataTransfer.types.includes(MEMO_DRAG_DATA_FORMAT);

interface SuggestedMemoSection {
  memos: SuggestedMemo[];
  onSelectMemo?: (memo: SuggestedMemo) => void;
  onOpenMemo?: (memoId: number) => void;
}

interface AiPanelProps {
  suggestedMemoSection?: SuggestedMemoSection;
}

const AiPanel = ({ suggestedMemoSection }: AiPanelProps) => {
  const { isOpen, selectedMemos, close, addMemo, removeMemo } = useAiPanel();

  const [isDragOver, setIsDragOver] = useState(false);
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

  const shouldShowSuggestedMemos =
    !!suggestedMemoSection && suggestedMemoSection.memos.length > 0;

  const handleSelectSuggestedMemo = (memo: SuggestedMemo) => {
    addMemo(memo);
    suggestedMemoSection?.onSelectMemo?.(memo);
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
        onCreateNewChat={handleCreateNewChat}
        onClose={close}
      />

      <div className={styles.content}>
        <div className={styles.chatWrapper}>
          {shouldShowSuggestedMemos && (
            <SuggestedMemoList
              memos={suggestedMemoSection.memos}
              onSelectMemo={handleSelectSuggestedMemo}
              onOpenMemo={suggestedMemoSection.onOpenMemo}
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
    </aside>
  );
};

export default AiPanel;
