import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';

import { useAiPanel } from './ai-panel-context';
import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelChat from './components/chat/ai-panel-chat/ai-panel-chat';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList, {
  SuggestedMemo,
} from './components/suggested-memo-list/suggested-memo-list';
import { useAiPanelChat } from './hooks/use-ai-panel-chat';

import * as styles from './ai-panel.css';

const AI_PANEL_TITLE_ID = 'ai-panel-title';

interface SuggestedMemoSection {
  memos: SuggestedMemo[];
  onSelectMemo?: (memo: SuggestedMemo) => void;
  onOpenMemo?: (memoId: number) => void;
}

interface AiPanelProps {
  isDragOver?: boolean;
  suggestedMemoSection?: SuggestedMemoSection;
}

const AiPanel = ({
  isDragOver = false,
  suggestedMemoSection,
}: AiPanelProps) => {
  const { isOpen, selectedMemos, close, addMemo, removeMemo } = useAiPanel();
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
    <aside className={styles.container} aria-labelledby={AI_PANEL_TITLE_ID}>
      <AiPanelHeader
        titleId={AI_PANEL_TITLE_ID}
        onCreateNewChat={handleCreateNewChat}
        onClose={close}
      />

      <div className={styles.content}>
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

        <PromptInput
          value={promptValue}
          onPromptChange={handlePromptChange}
          onOptionSelect={handleOptionSelect}
          onSubmit={handleSubmit}
          disabled={isLoading}
          selectedMemos={selectedMemos}
          onRemoveMemo={removeMemo}
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
