import { useCallback, useEffect, useState } from 'react';

import {
  useCreateAiChat,
  useCreateChatRoom,
  useSaveAiMemo,
} from '@shared/apis/prompt/queries';

import { AiOption, Message } from '../types/ai-prompt-types';
import { PromptInputValueType, SelectedMemoType } from '../types/prompt-input';
import {
  createAiErrorMessage,
  createAiMessage,
  createUserMessage,
  getMemoIds,
  isValidOption,
} from '../utils/ai-message';

interface UseAiChatActionsParams {
  isAIOpen: boolean;
  externalChatRoomId?: number | null;
  messages: Message[];
  selectedMemos: SelectedMemoType[];
  addMessage: (message: Message) => void;
  insertMessageAfter: (targetMessageId: string, message: Message) => void;
  onStartGenerating: (memoCount: number) => void;
  onCreateGeneratingMessage: (messageId: string | null) => void;
}

export const useAiChatActions = ({
  isAIOpen,
  externalChatRoomId,
  messages,
  selectedMemos,
  addMessage,
  insertMessageAfter,
  onStartGenerating,
  onCreateGeneratingMessage,
}: UseAiChatActionsParams) => {
  const [internalChatRoomId, setInternalChatRoomId] = useState<number | null>(
    null,
  );
  const createChatRoomMutation = useCreateChatRoom();
  const createAiChatMutation = useCreateAiChat();
  const saveAiMemoMutation = useSaveAiMemo();
  const chatRoomId = externalChatRoomId ?? internalChatRoomId;

  useEffect(() => {
    if (
      isAIOpen &&
      !chatRoomId &&
      !createChatRoomMutation.isPending &&
      !externalChatRoomId
    ) {
      createChatRoomMutation.mutate(undefined, {
        onSuccess: (data) => {
          const newChatRoomId = data.data?.chatRoomId;
          if (newChatRoomId) {
            setInternalChatRoomId(newChatRoomId);
          }
        },
      });
    }
  }, [isAIOpen, chatRoomId, externalChatRoomId, createChatRoomMutation]);

  useEffect(() => {
    if (!isAIOpen) {
      setInternalChatRoomId(null);
    }
  }, [isAIOpen]);

  const resetInternalChatRoom = useCallback(() => {
    if (!externalChatRoomId) {
      setInternalChatRoomId(null);
    }
  }, [externalChatRoomId]);

  const handleSubmit = useCallback(
    (value: PromptInputValueType) => {
      const userPrompt = value.userPrompt.trim();
      if (!userPrompt || !chatRoomId) return false;

      const memoIds = getMemoIds(selectedMemos);
      const option: AiOption = isValidOption(value.option)
        ? value.option
        : null;

      onStartGenerating(memoIds.length);
      onCreateGeneratingMessage(null);
      addMessage(createUserMessage(userPrompt));

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

          if (response.data) {
            const aiMessage = createAiMessage({
              content: response.data.content || '',
              title: response.data.title,
              memoIds: response.data.memoIds ?? memoIds,
              userPrompt,
              option: isValidOption(response.data.option)
                ? response.data.option
                : option,
            });

            onCreateGeneratingMessage(aiMessage.id);
            addMessage(aiMessage);
          }
        } catch {
          const errorMessage = createAiErrorMessage({
            text: 'AI 응답 생성에 실패했습니다. 다시 시도해주세요.',
            memoIds,
            userPrompt,
            option,
          });

          onCreateGeneratingMessage(errorMessage.id);
          addMessage(errorMessage);
        }
      })();

      return true;
    },
    [
      selectedMemos,
      chatRoomId,
      createAiChatMutation,
      addMessage,
      onStartGenerating,
      onCreateGeneratingMessage,
    ],
  );

  const handleRegenerate = useCallback(
    async (messageId: string) => {
      if (!chatRoomId) return;

      const aiMessage = messages.find((msg) => msg.id === messageId);
      if (!aiMessage || aiMessage.type !== 'ai') return;

      if (!aiMessage.memoIds || !aiMessage.userPrompt) {
        return;
      }

      const option = aiMessage.option ?? null;
      onStartGenerating(aiMessage.memoIds.length);
      onCreateGeneratingMessage(null);

      try {
        const response = await createAiChatMutation.mutateAsync({
          chatRoomId,
          body: {
            userPrompt: aiMessage.userPrompt,
            option,
            memoIds: aiMessage.memoIds,
          },
        });

        if (response.data) {
          const newAiMessage = createAiMessage({
            content: response.data.content || '',
            title: response.data.title,
            memoIds: response.data.memoIds ?? aiMessage.memoIds,
            userPrompt: aiMessage.userPrompt,
            option: isValidOption(response.data.option)
              ? response.data.option
              : option,
          });

          onCreateGeneratingMessage(newAiMessage.id);
          insertMessageAfter(messageId, newAiMessage);
        }
      } catch {
        const errorMessage = createAiErrorMessage({
          text: 'AI 응답 재생성에 실패했습니다. 다시 시도해주세요.',
          memoIds: aiMessage.memoIds,
          userPrompt: aiMessage.userPrompt,
          option,
        });

        onCreateGeneratingMessage(errorMessage.id);
        insertMessageAfter(messageId, errorMessage);
      }
    },
    [
      messages,
      chatRoomId,
      createAiChatMutation,
      insertMessageAfter,
      onStartGenerating,
      onCreateGeneratingMessage,
    ],
  );

  const handleSaveToMemo = useCallback(
    async (messageId: string) => {
      const message = messages.find((msg) => msg.id === messageId);
      if (
        !message ||
        message.type !== 'ai' ||
        !message.title ||
        !message.text
      ) {
        return;
      }

      const sourceMemoIds = message.memoIds || getMemoIds(selectedMemos);
      if (sourceMemoIds.length === 0) return false;

      try {
        await saveAiMemoMutation.mutateAsync({
          title: message.title,
          content: message.text,
          sourceMemoIds,
        });
        return true;
      } catch {
        return false;
      }
    },
    [messages, selectedMemos, saveAiMemoMutation],
  );

  return {
    isCreatingChatRoom: createChatRoomMutation.isPending,
    isCreatingAiChat: createAiChatMutation.isPending,
    isSavingAiMemo: saveAiMemoMutation.isPending,
    resetInternalChatRoom,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  };
};
