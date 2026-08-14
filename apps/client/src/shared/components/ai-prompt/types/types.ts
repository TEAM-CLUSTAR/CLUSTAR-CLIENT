import { SelectedMemoType } from '@shared/components/ai-panel/types/types';

export type MessageType = 'user' | 'ai';

export type AiOption = 'MERGE' | 'SUMMARY' | 'STRUCTURE' | null;

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  title?: string;
  memoIds?: number[];
  userPrompt?: string;
  option?: AiOption;
}

export interface UseAiPromptProps {
  isAIOpen: boolean;
  selectedMemos: SelectedMemoType[];
  handleClose: () => void;
  chatRoomId?: number | null;
}
