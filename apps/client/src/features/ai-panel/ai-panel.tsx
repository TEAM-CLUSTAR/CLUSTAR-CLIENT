import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';

import AiPanelHeader from './components/ai-panel-header/ai-panel-header';
import AiPanelChat from './components/chat/ai-panel-chat/ai-panel-chat';
import PromptInput from './components/prompt-input/prompt-input';
import SuggestedMemoList, {
  SuggestedMemo,
} from './components/suggested-memo-list/suggested-memo-list';
import { useAiPanelChat } from './hooks/use-ai-panel-chat';
import { SelectedMemoType } from './types/ai-panel.types';

import * as styles from './ai-panel.css';

interface AiPanelProps {
  isAIOpen: boolean;
  selectedMemos: SelectedMemoType[];
  handleClose: () => void;
  onRemoveMemo: (memoId: number) => void;
  isDragOver?: boolean;
  chatRoomId?: number | null;
  suggestedMemos?: SuggestedMemo[];
  onSelectSuggestedMemo?: (memo: SelectedMemoType) => void;
  onOpenSuggestedMemo?: (memoId: number) => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

const AiPanel = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  onRemoveMemo,
  isDragOver = false,
  chatRoomId: externalChatRoomId,
  suggestedMemos = [],
  onSelectSuggestedMemo,
  onOpenSuggestedMemo,
  onLoadingChange,
}: AiPanelProps) => {
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
    isOpen: isAIOpen,
    selectedMemos,
    externalChatRoomId,
    onLoadingChange,
  });

  const shouldShowSuggestedMemos =
    suggestedMemos.length > 0 && !!onSelectSuggestedMemo;

  if (!isAIOpen) return null;

  return (
    <aside className={styles.container} aria-label="AI 생성하기">
      <AiPanelHeader
        onCreateNewChat={handleCreateNewChat}
        onClose={handleClose}
      />

      <div className={styles.content}>
        {shouldShowSuggestedMemos && (
          <SuggestedMemoList
            memos={suggestedMemos}
            onSelectMemo={onSelectSuggestedMemo}
            onOpenMemo={onOpenSuggestedMemo}
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
