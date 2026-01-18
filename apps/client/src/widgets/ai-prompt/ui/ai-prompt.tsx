import { useAiPrompt, UseAiPromptProps } from '@features/ai-prompt';
import AiPromptHeader from '@features/ai-prompt/ui/prompt-header/prompt-header';
import PromptInput from '@features/ai-prompt/ui/prompt-input/prompt-input';
import AiMessagesList from '@features/ai-prompt/ui/prompt-messages-list/prompt-messages-list';
import SelectedMemosList from '@features/ai-prompt/ui/selected-memo-section/selected-memo-section';

import * as styles from './ai-prompt.css';

type AiPromptProps = UseAiPromptProps;

const AiPrompt = ({ isAIOpen, selectedMemos, handleClose }: AiPromptProps) => {
  const {
    isOpen,
    messages,
    isLoading,
    inputText,
    selectedOptionId,
    setInputText,
    setSelectedOptionId,
    handlePromptClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  } = useAiPrompt({
    isAIOpen,
    selectedMemos,
    handleClose,
  });

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
        disabled={isLoading}
      />
    </div>
  );
};

export default AiPrompt;
