import type { AiOption } from '@shared/apis/prompt/type';

import { SelectedMemoType } from './prompt-input';

export type { AiOption };

export type MessageType = 'user' | 'ai';

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
