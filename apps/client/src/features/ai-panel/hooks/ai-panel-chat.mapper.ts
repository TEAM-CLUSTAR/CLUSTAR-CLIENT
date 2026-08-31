import type {
  ActiveChatMessageResponse,
  MemoRecommendationItemResponse,
} from '@shared/apis/prompt/type';

import type { AiPanelMessage, SelectedMemoType } from '../types/ai-panel.types';

const FAILED_AI_MESSAGE = 'AI 응답 생성에 실패했습니다. 다시 시도해주세요.';

export const mapActiveChatMessages = (
  messages: ActiveChatMessageResponse[],
): AiPanelMessage[] => {
  let latestUserRequest:
    | Pick<AiPanelMessage, 'userPrompt' | 'option' | 'memoIds'>
    | undefined;

  return messages.map((message) => {
    const option = message.option ?? null;
    const memoIds = message.memoIds ?? [];

    if (message.role === 'USER') {
      latestUserRequest = {
        userPrompt: message.content ?? '',
        option,
        memoIds,
      };

      return {
        id: `chat-message-${message.messageId}`,
        type: 'user',
        text: message.content ?? '',
        userPrompt: message.content ?? '',
        option,
        memoIds,
      };
    }

    const sourceMemoIds =
      memoIds.length > 0 ? memoIds : latestUserRequest?.memoIds;

    return {
      id: `chat-message-${message.messageId}`,
      type: 'ai',
      text:
        message.status === 'FAILED'
          ? FAILED_AI_MESSAGE
          : (message.content ?? ''),
      title: message.title ?? undefined,
      userPrompt: latestUserRequest?.userPrompt,
      option: option ?? latestUserRequest?.option,
      memoIds: sourceMemoIds,
    };
  });
};

export const mapRecommendedMemos = (
  memos: MemoRecommendationItemResponse[],
  selectedMemos: SelectedMemoType[],
) => {
  const selectedMemoIds = new Set(selectedMemos.map((memo) => memo.memoId));

  return memos.map((memo) => ({
    memoId: memo.memoId,
    title: memo.title,
    isSelected: selectedMemoIds.has(memo.memoId),
  }));
};
