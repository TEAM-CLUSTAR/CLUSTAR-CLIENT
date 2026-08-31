import type { AiOption } from '../apis/type';
import type {
  AiPanelMessage,
  PromptInputValueType,
} from '../types/ai-panel.types';

export const DEFAULT_PROMPT_VALUE: PromptInputValueType = {
  userPrompt: '',
  option: 'MERGE',
};

export const FAILED_AI_MESSAGE =
  'AI 응답 생성에 실패했습니다. 다시 시도해주세요.';

const VALID_OPTIONS = ['MERGE', 'SUMMARY', 'STRUCTURE', 'DEFAULT'] as const;

export const isValidOption = (
  value: string | null | undefined,
): value is Exclude<AiOption, null> => {
  if (!value) return false;
  return VALID_OPTIONS.includes(value as Exclude<AiOption, null>);
};

export const createMessageId = (prefix: string) => {
  return `${prefix}-${crypto.randomUUID()}`;
};

export const createAiMessage = ({
  content,
  title,
  memoIds,
  userPrompt,
  option,
}: {
  content?: string | null;
  title?: string;
  memoIds: number[];
  userPrompt: string;
  option: AiOption;
}): AiPanelMessage => ({
  id: createMessageId('ai'),
  text: content || '',
  title,
  type: 'ai',
  memoIds,
  userPrompt,
  option,
});
