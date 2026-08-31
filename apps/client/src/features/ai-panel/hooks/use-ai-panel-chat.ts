import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useCreateAiChat,
  useCreateChatRoom,
  useGetActiveChatRoom,
  useSaveAiMemo,
} from '@shared/apis/prompt/queries';
import type { AiOption } from '@shared/apis/prompt/type';

import {
  AiPanelMessage,
  PromptInputValueType,
  SelectedMemoType,
} from '../types/ai-panel.types';
import {
  createAiMessage,
  createMessageId,
  DEFAULT_PROMPT_VALUE,
  FAILED_AI_MESSAGE,
  isValidOption,
} from './ai-panel-chat.helpers';
import { mapActiveChatMessages } from './ai-panel-chat.mapper';
import { useAiPanelRecommendedMemos } from './use-ai-panel-recommended-memos';

interface UseAiPanelChatParams {
  isOpen: boolean;
  selectedMemos: SelectedMemoType[];
}

const getMemoIds = (memos: SelectedMemoType[]) =>
  memos.map((memo) => memo.memoId);

export const useAiPanelChat = ({
  isOpen,
  selectedMemos,
}: UseAiPanelChatParams) => {
  const [internalChatRoomId, setInternalChatRoomId] = useState<number | null>(
    null,
  );
  const [messages, setMessages] = useState<AiPanelMessage[]>([]);
  const [answerGeneratingMemoCount, setAnswerGeneratingMemoCount] = useState(0);
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);
  const [promptValue, setPromptValue] =
    useState<PromptInputValueType>(DEFAULT_PROMPT_VALUE);

  const createChatRoomMutation = useCreateChatRoom();
  const createAiChatMutation = useCreateAiChat();
  const saveAiMemoMutation = useSaveAiMemo();

  const chatRoomId = internalChatRoomId;
  const activeChatRoomQuery = useGetActiveChatRoom(isOpen);
  const memoIds = useMemo(() => getMemoIds(selectedMemos), [selectedMemos]);
  const { recommendedMemos, resetRecommendedMemos } =
    useAiPanelRecommendedMemos({
      memoIds,
      selectedMemos,
    });
  const isLoading =
    activeChatRoomQuery.isFetching ||
    createChatRoomMutation.isPending ||
    createAiChatMutation.isPending ||
    saveAiMemoMutation.isPending;

  const appendMessage = useCallback((message: AiPanelMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const createChatRoomIfAbsent = useCallback(async () => {
    if (chatRoomId) return chatRoomId;

    const response = await createChatRoomMutation.mutateAsync();
    const newChatRoomId = response.data?.chatRoomId ?? null;

    if (newChatRoomId) {
      setInternalChatRoomId(newChatRoomId);
    }

    return newChatRoomId;
  }, [chatRoomId, createChatRoomMutation]);

  useEffect(() => {
    const activeChatRoom = activeChatRoomQuery.data?.data;
    if (!activeChatRoom) return;

    setInternalChatRoomId(activeChatRoom.chatRoomId);
    setMessages(mapActiveChatMessages(activeChatRoom.messages));
  }, [activeChatRoomQuery.data]);

  const handleCreateNewChat = useCallback(() => {
    void (async () => {
      try {
        const response = await createChatRoomMutation.mutateAsync();
        const newChatRoomId = response.data?.chatRoomId ?? null;

        setInternalChatRoomId(newChatRoomId);
        setMessages([]);
        resetRecommendedMemos();
        setAnswerGeneratingMemoCount(0);
        setPromptValue(DEFAULT_PROMPT_VALUE);
      } catch {
        return;
      }
    })();
  }, [createChatRoomMutation, resetRecommendedMemos]);

  const handlePromptChange = useCallback((userPrompt: string) => {
    setPromptValue((prev) => ({ ...prev, userPrompt }));
  }, []);

  const handleOptionSelect = useCallback(
    (option: PromptInputValueType['option']) => {
      setPromptValue((prev) => {
        if (prev.option === option) return prev;

        return { ...prev, option };
      });
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const userPrompt = promptValue.userPrompt.trim();
    if (!userPrompt) return false;
    if (memoIds.length === 0) return false;

    const option: AiOption = isValidOption(promptValue.option)
      ? promptValue.option
      : null;

    setAnswerGeneratingMemoCount(memoIds.length);
    appendMessage({
      id: createMessageId('user'),
      text: userPrompt,
      type: 'user',
    });

    void (async () => {
      try {
        const nextChatRoomId = await createChatRoomIfAbsent();
        if (!nextChatRoomId) {
          throw new Error('Failed to create AI chat room');
        }

        const response = await createAiChatMutation.mutateAsync({
          chatRoomId: nextChatRoomId,
          body: {
            userPrompt,
            option,
            memoIds,
          },
        });

        const responseData = response.data;
        if (!responseData) return;

        appendMessage(
          createAiMessage({
            content: responseData.content,
            title: responseData.title,
            memoIds: responseData.memoIds ?? memoIds,
            userPrompt,
            option: isValidOption(responseData.option)
              ? responseData.option
              : option,
          }),
        );
      } catch {
        appendMessage({
          id: createMessageId('error'),
          text: FAILED_AI_MESSAGE,
          type: 'ai',
          memoIds,
          userPrompt,
          option,
        });
      }
    })();

    setPromptValue((prev) => ({ ...prev, userPrompt: '' }));

    return true;
  }, [
    appendMessage,
    createAiChatMutation,
    createChatRoomIfAbsent,
    memoIds,
    promptValue.option,
    promptValue.userPrompt,
  ]);

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
    messages,
    isLoading,
    isAnswerLoading: createAiChatMutation.isPending,
    promptValue,
    answerGeneratingMemoCount,
    recommendedMemos,
    isSaveConfirmModalOpen,
    setIsSaveConfirmModalOpen,
    handleCreateNewChat,
    handlePromptChange,
    handleOptionSelect,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  };
};
