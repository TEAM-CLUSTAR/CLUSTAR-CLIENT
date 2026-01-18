export type MessageType = 'user' | 'ai';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  title?: string;
}

export interface SelectedMemo {
  id: string;
  title: string;
}

export interface UseAiPromptProps {
  isAIOpen: boolean;
  selectedMemos: SelectedMemo[];
  handleClose: () => void;
}
