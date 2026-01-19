import { useEffect } from 'react';

import { useAiPrompt, UseAiPromptProps } from '@features/ai-prompt';
import AiPromptHeader from '@features/ai-prompt/ui/prompt-header/prompt-header';
import PromptInput from '@features/ai-prompt/ui/prompt-input/prompt-input';
import AiMessagesList from '@features/ai-prompt/ui/prompt-messages-list/prompt-messages-list';
import SelectedMemosList from '@features/ai-prompt/ui/selected-memo-section/selected-memo-section';

import * as styles from './ai-prompt.css';

interface AiPromptProps extends UseAiPromptProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

const AiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  onLoadingChange,
}: AiPromptProps) => {
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
  });

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

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
        handleSaveToMemo={handleSaveToMemo}
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
    </div>
  );
};

export default AiPrompt;
