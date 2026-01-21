import { useEffect, useState } from 'react';

import { ConfirmModal } from '@cds/ui';

import { useAiPrompt, UseAiPromptProps } from '@features/ai-prompt';
import AiPromptHeader from '@features/ai-prompt/ui/prompt-header/prompt-header';
import PromptInput from '@features/ai-prompt/ui/prompt-input/prompt-input';
import AiMessagesList from '@features/ai-prompt/ui/prompt-messages-list/prompt-messages-list';
import SelectedMemosList from '@features/ai-prompt/ui/selected-memo-section/selected-memo-section';

import * as styles from './ai-prompt.css';

interface AiPromptProps extends UseAiPromptProps {
  onLoadingChange?: (isLoading: boolean) => void;
  chatRoomId?: number | null;
}

const AiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  onLoadingChange,
  chatRoomId,
}: AiPromptProps) => {
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);

  const {
    isOpen,
    messages,
    isLoading,
    inputText,
    selectedOptionId,
    setInputText,
    setSelectedOptionId,
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

  const handleSaveConfirmModalClose = () => {
    setIsSaveConfirmModalOpen(false);
  };

  const handleSaveModalOpenChange = (open: boolean) => {
    setIsSaveConfirmModalOpen(open);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <AiPromptHeader handleClose={handlePromptClose} />
      <SelectedMemosList selectedMemos={selectedMemos} />
      <AiMessagesList
        messages={messages}
        isLoading={isLoading}
        selectedMemosCount={selectedMemos.length}
        handleRegenerate={handleRegenerate}
        handleSaveToMemo={handleSaveToMemoWithModal}
      />
      <PromptInput
        value={inputText}
        onChange={setInputText}
        selectedOptionId={selectedOptionId}
        onOptionSelect={setSelectedOptionId}
        handleSubmit={handleSubmit}
        disabled={isLoading || selectedMemos.length === 0}
        selectedMemosCount={selectedMemos.length}
      />
      <ConfirmModal
        open={isSaveConfirmModalOpen}
        onOpenChange={handleSaveModalOpenChange}
        onCloseClick={handleSaveConfirmModalClose}
        isHavedCancel={false}
      />
    </div>
  );
};

export default AiPrompt;
