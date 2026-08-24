import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useCreateAiChat,
  useCreateChatRoom,
  useSaveAiMemo,
} from '@shared/apis/prompt/queries';
import type { AiOption } from '@shared/apis/prompt/type';

import {
  AiPanelMessage,
  PromptInputValueType,
  SelectedMemoType,
} from '../types/ai-panel.types';

interface UseAiPanelChatParams {
  isOpen: boolean;
  selectedMemos: SelectedMemoType[];
  externalChatRoomId?: number | null;
  onLoadingChange?: (isLoading: boolean) => void;
}

const VALID_OPTIONS = ['MERGE', 'SUMMARY', 'STRUCTURE'] as const;

const isValidOption = (
  value: string | null | undefined,
): value is Exclude<AiOption, null> => {
  if (!value) return false;
  return VALID_OPTIONS.includes(value as Exclude<AiOption, null>);
};

const createMessageId = (prefix: string) => {
  return `${prefix}-${crypto.randomUUID()}`;
};

const getMemoIds = (memos: SelectedMemoType[]) =>
  memos.map((memo) => memo.memoId);

const createAiMessage = ({
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

export const useAiPanelChat = ({
  isOpen,
  selectedMemos,
  externalChatRoomId,
  onLoadingChange,
}: UseAiPanelChatParams) => {
  const [internalChatRoomId, setInternalChatRoomId] = useState<number | null>(
    null,
  );
  const [messages, setMessages] = useState<AiPanelMessage[]>([]);
  const [answerGeneratingMemoCount, setAnswerGeneratingMemoCount] = useState(0);
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);

  const createChatRoomMutation = useCreateChatRoom();
  const createAiChatMutation = useCreateAiChat();
  const saveAiMemoMutation = useSaveAiMemo();

  const chatRoomId = externalChatRoomId ?? internalChatRoomId;
  const memoIds = useMemo(() => getMemoIds(selectedMemos), [selectedMemos]);
  const isLoading =
    createChatRoomMutation.isPending ||
    createAiChatMutation.isPending ||
    saveAiMemoMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInternalChatRoomId(null);
      return;
    }

    if (chatRoomId || createChatRoomMutation.isPending) return;

    createChatRoomMutation.mutate(undefined, {
      onSuccess: (data) => {
        const newChatRoomId = data.data?.chatRoomId;
        if (newChatRoomId) {
          setInternalChatRoomId(newChatRoomId);
        }
      },
    });
  }, [isOpen, chatRoomId, createChatRoomMutation]);

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const resetChat = () => {
    setMessages([]);
    setAnswerGeneratingMemoCount(0);
    setInternalChatRoomId(null);
  };

  const handleSubmit = useCallback(
    (value: PromptInputValueType) => {
      const userPrompt = value.userPrompt.trim();
      if (!userPrompt || !chatRoomId) return false;

      const option: AiOption = isValidOption(value.option)
        ? value.option
        : null;

      setAnswerGeneratingMemoCount(memoIds.length);
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('user'),
          text: userPrompt,
          type: 'user',
        },
      ]);

      void (async () => {
        try {
          const response = await createAiChatMutation.mutateAsync({
            chatRoomId,
            body: {
              userPrompt,
              option,
              memoIds,
            },
          });

          const responseData = response.data;
          if (!responseData) return;

          setMessages((prev) => [
            ...prev,
            createAiMessage({
              content: responseData.content,
              title: responseData.title,
              memoIds: responseData.memoIds ?? memoIds,
              userPrompt,
              option: isValidOption(responseData.option)
                ? responseData.option
                : option,
            }),
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              id: createMessageId('error'),
              text: 'AI 응답 생성에 실패했습니다. 다시 시도해주세요.',
              type: 'ai',
              memoIds,
              userPrompt,
              option,
            },
          ]);
        }
      })();

      return true;
    },
    [chatRoomId, createAiChatMutation, memoIds],
  );

  const handleRegenerate = async (messageId: string) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message || message.type !== 'ai' || !message.userPrompt || !chatRoomId)
      return;

    const sourceMemoIds = message.memoIds ?? memoIds;
    const option = message.option ?? null;

    setAnswerGeneratingMemoCount(sourceMemoIds.length);

    try {
      const response = await createAiChatMutation.mutateAsync({
        chatRoomId,
        body: {
          userPrompt: message.userPrompt,
          option,
          memoIds: sourceMemoIds,
        },
      });

      if (!response.data) return;

      const nextMessage = createAiMessage({
        content: response.data.content,
        title: response.data.title,
        memoIds: response.data.memoIds ?? sourceMemoIds,
        userPrompt: message.userPrompt,
        option: isValidOption(response.data.option)
          ? response.data.option
          : option,
      });

      setMessages((prev) => {
        const index = prev.findIndex((item) => item.id === messageId);
        if (index === -1) return [...prev, nextMessage];
        return [
          ...prev.slice(0, index + 1),
          nextMessage,
          ...prev.slice(index + 1),
        ];
      });
    } catch {
      return;
    }
  };

  const handleSaveToMemo = async (messageId: string) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message || message.type !== 'ai' || !message.title || !message.text)
      return;

    const sourceMemoIds = message.memoIds ?? memoIds;
    if (sourceMemoIds.length === 0) return;

    try {
      await saveAiMemoMutation.mutateAsync({
        title: message.title,
        content: message.text,
        sourceMemoIds,
      });
      setIsSaveConfirmModalOpen(true);
    } catch {
      return;
    }
  };

  return {
    chatRoomId,
    messages,
    isLoading,
    isAnswerLoading: createAiChatMutation.isPending,
    answerGeneratingMemoCount,
    isSaveConfirmModalOpen,
    setIsSaveConfirmModalOpen,
    handleCreateNewChat: resetChat,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  };
};
