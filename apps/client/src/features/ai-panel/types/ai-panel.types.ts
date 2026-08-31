import type { AiOption } from '@shared/apis/prompt/type';
import { components } from '@shared/types/schema';

export type PromptInputValueType = Required<
  Pick<components['schemas']['MemoAiRequest'], 'userPrompt' | 'option'>
>;

export type SelectedMemoType = Required<
  Pick<components['schemas']['MemoResponse'], 'memoId' | 'title'>
>;

export interface SuggestedMemoType extends SelectedMemoType {
  isSelected: boolean;
}

export interface AiPanelMessage {
  id: string;
  text: string;
  type: 'user' | 'ai';
  title?: string;
  memoIds?: number[];
  userPrompt?: string;
  option?: AiOption;
}
