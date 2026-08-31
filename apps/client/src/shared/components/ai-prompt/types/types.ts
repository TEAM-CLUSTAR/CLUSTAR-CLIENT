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

export interface SelectedMemo {
  id: string;
  title: string;
}

export interface UseAiPromptProps {
  isAIOpen: boolean;
  selectedMemos: SelectedMemo[];
  handleClose: () => void;
  chatRoomId?: number | null;
}
