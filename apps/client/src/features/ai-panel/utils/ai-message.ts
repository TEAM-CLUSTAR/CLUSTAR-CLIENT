import { AiOption, Message } from '../types/ai-prompt-types';
import { SelectedMemoType } from '../types/prompt-input';

const VALID_OPTIONS = ['MERGE', 'SUMMARY', 'STRUCTURE'] as const;

export const isValidOption = (
  value: string | null | undefined,
): value is Exclude<AiOption, null> => {
  if (!value) return false;
  return VALID_OPTIONS.includes(value as Exclude<AiOption, null>);
};

export const getMemoIds = (memos: SelectedMemoType[]): number[] =>
  memos.map((memo) => memo.memoId);

const createMessageId = (prefix?: string) => {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}-${id}` : id;
};

export const createUserMessage = (userPrompt: string): Message => ({
  id: createMessageId(),
  text: userPrompt,
  type: 'user',
});

interface AiMessageParams {
  content: string;
  title?: string;
  memoIds: number[];
  userPrompt: string;
  option: AiOption;
}

export const createAiMessage = ({
  content,
  title,
  memoIds,
  userPrompt,
  option,
}: AiMessageParams): Message => ({
  id: createMessageId('ai'),
  text: content,
  title,
  type: 'ai',
  memoIds,
  userPrompt,
  option,
});

interface AiErrorMessageParams {
  text: string;
  memoIds: number[];
  userPrompt: string;
  option: AiOption;
}

export const createAiErrorMessage = ({
  text,
  memoIds,
  userPrompt,
  option,
}: AiErrorMessageParams): Message => ({
  id: createMessageId('error'),
  text,
  type: 'ai',
  memoIds,
  userPrompt,
  option,
});

export const insertMessageAfter = (
  messages: Message[],
  targetMessageId: string,
  newMessage: Message,
): Message[] => {
  const messageIndex = messages.findIndex((msg) => msg.id === targetMessageId);
  if (messageIndex === -1) {
    return [...messages, newMessage];
  }
  return [
    ...messages.slice(0, messageIndex + 1),
    newMessage,
    ...messages.slice(messageIndex + 1),
  ];
};
