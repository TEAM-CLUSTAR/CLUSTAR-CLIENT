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

interface SuggestedMemoSection {
  memos: SuggestedMemo[];
  onSelectMemo?: (memo: SuggestedMemo) => void;
  onOpenMemo?: (memoId: number) => void;
}

interface AiPanelProps {
  isDragOver?: boolean;
  chatRoomId?: number | null;
  suggestedMemoSection?: SuggestedMemoSection;
  onLoadingChange?: (isLoading: boolean) => void;
}

const AiPanel = ({
  isDragOver = false,
  chatRoomId: externalChatRoomId,
  suggestedMemoSection,
  onLoadingChange,
}: AiPanelProps) => {
  const { isOpen, selectedMemos, close, addMemo, removeMemo } = useAiPanel();
  const {
    chatRoomId,
    messages,
    isLoading,
    isAnswerLoading,
    answerGeneratingMemoCount,
    isSaveConfirmModalOpen,
    setIsSaveConfirmModalOpen,
    handleCreateNewChat,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  } = useAiPanelChat({
    isOpen,
    selectedMemos,
    externalChatRoomId,
    onLoadingChange,
  });

  const shouldShowSuggestedMemos =
    !!suggestedMemoSection && suggestedMemoSection.memos.length > 0;

  const handleSelectSuggestedMemo = (memo: SuggestedMemo) => {
    addMemo(memo);
    suggestedMemoSection?.onSelectMemo?.(memo);
  };

  if (!isOpen) return null;

  return (
    <aside className={styles.container} aria-label="AI 생성하기">
      <AiPanelHeader onCreateNewChat={handleCreateNewChat} onClose={close} />

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
          key={chatRoomId}
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
