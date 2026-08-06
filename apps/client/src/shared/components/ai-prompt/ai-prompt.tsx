import { useEffect, useState } from 'react';

import PromptInput from '../ai-panel/prompt-input/prompt-input';
import ConfirmModal from '../modals/confirm-modal/confirm-modal';
import AiPromptHeader from './components/prompt-header/prompt-header';
import AiMessagesList from './components/prompt-messages-list/prompt-messages-list';
import { useAiPrompt } from './hooks/use-ai-prompt';
import { UseAiPromptProps } from './types/types';

import * as styles from './ai-prompt.css';

interface AiPromptProps extends UseAiPromptProps {
  onLoadingChange?: (isLoading: boolean) => void;
  chatRoomId?: number | null;
  onRemoveMemo: (memoId: number) => void;
  isDragOver: boolean;
}

const AiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  onLoadingChange,
  chatRoomId,
  onRemoveMemo,
  isDragOver,
}: AiPromptProps) => {
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);

  const {
    isOpen,
    messages,
    isLoading,
    handleClose: handlePromptClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  } = useAiPrompt({
    isAIOpen,
    selectedMemos,
    handleClose,
    chatRoomId,
  });

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  const handleSaveToMemoWithModal = async (messageId: string) => {
    const success = await handleSaveToMemo(messageId);
    if (success) {
      setIsSaveConfirmModalOpen(true);
    }
  };

  const handleSaveModalOpenChange = (open: boolean) => {
    setIsSaveConfirmModalOpen(open);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <AiPromptHeader handleClose={handlePromptClose} />
      <AiMessagesList
        messages={messages}
        isLoading={isLoading}
        selectedMemosCount={selectedMemos.length}
        handleRegenerate={handleRegenerate}
        handleSaveToMemo={handleSaveToMemoWithModal}
      />
      <PromptInput
        key={chatRoomId}
        onSubmit={handleSubmit}
        disabled={isLoading}
        selectedMemos={selectedMemos}
        onRemoveMemo={onRemoveMemo}
        isDragOver={isDragOver}
      />

      <ConfirmModal
        open={isSaveConfirmModalOpen}
        onOpenChange={handleSaveModalOpenChange}
        hasCancel={false}
      />
    </div>
  );
};

export default AiPrompt;
