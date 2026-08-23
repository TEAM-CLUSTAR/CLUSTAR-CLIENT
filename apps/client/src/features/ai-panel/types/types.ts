import { components } from '@shared/types/schema';

export type PromptInputValueType = Required<
  Pick<components['schemas']['MemoAiRequest'], 'userPrompt' | 'option'>
>;

export type SelectedMemoType = Required<
  Pick<components['schemas']['MemoResponse'], 'memoId' | 'title'>
>;
