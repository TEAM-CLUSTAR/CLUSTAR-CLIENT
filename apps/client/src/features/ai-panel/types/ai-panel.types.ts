import { components } from '@shared/types/schema';

import type { AiOption } from '../apis/type';

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
