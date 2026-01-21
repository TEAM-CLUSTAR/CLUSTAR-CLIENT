import { useCallback, useEffect, useState } from 'react';

import {
  useCreateAiChat,
  useCreateChatRoom,
  useSaveAiMemo,
} from '@widgets/memo-list-view/api/queries';

import { AiOption, Message, UseAiPromptProps } from './types';

const VALID_OPTIONS = ['MERGE', 'SUMMARY', 'STRUCTURE'] as const;

const isValidOption = (
  value: string | null | undefined,
): value is Exclude<AiOption, null> => {
  if (!value) return false;
  return VALID_OPTIONS.includes(value as Exclude<AiOption, null>);
};

const convertMemoIdsToNumbers = (memos: { id: string }[]): number[] => {
  return memos
    .map((memo) => {
      const numId = Number(memo.id);
      return isNaN(numId) ? null : numId;
    })
    .filter((id): id is number => id !== null);
};

const insertMessageAfter = (
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

// AI 프롬프트 사용자 정의 훅
export const useAiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  chatRoomId: externalChatRoomId,
}: UseAiPromptProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [internalChatRoomId, setInternalChatRoomId] = useState<number | null>(
    null,
  );

  const chatRoomId = externalChatRoomId ?? internalChatRoomId;

  const createChatRoomMutation = useCreateChatRoom();
  const createAiChatMutation = useCreateAiChat();
  const saveAiMemoMutation = useSaveAiMemo();

  // 로딩 상태는 mutation 상태와 동기화
  const isLoading =
    createChatRoomMutation.isPending ||
    createAiChatMutation.isPending ||
    saveAiMemoMutation.isPending;

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
        onError: (error) => {
          console.error('채팅방 생성 실패:', error);
        },
      });
    }
  }, [isAIOpen, chatRoomId, externalChatRoomId, createChatRoomMutation]);

  // AI 프롬프트가 닫힐 때 채팅방 ID 초기화 (내부 상태만 초기화)
  useEffect(() => {
    if (!isAIOpen) {
      setInternalChatRoomId(null);
      setMessages([]);
    }
  }, [isAIOpen]);

  // AI 프롬프트 입력 요청
  const handleSubmit = useCallback(
    async (value: {
      text: string;
      selectedOptionId: string | null;
      skipUserMessage?: boolean;
    }) => {
      if (!value.text.trim() || !chatRoomId) return;

      // 요청 전송 시 즉시 입력값과 옵션 초기화
      if (!value.skipUserMessage) {
        setInputText('');
        setSelectedOptionId(null);
      }

      if (!value.skipUserMessage) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: value.text.trim(),
          type: 'user',
        };
        setMessages((prev) => [...prev, userMessage]);
      }

      const memoIds = convertMemoIdsToNumbers(selectedMemos);

      const option = isValidOption(value.selectedOptionId)
        ? value.selectedOptionId
        : null;

      const userPrompt = value.text.trim();

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
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: response.data.content || '',
            title: response.data.title,
            type: 'ai',
            memoIds,
            userPrompt,
            option,
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      } catch (error) {
        console.error('AI 응답 생성 실패:', error);
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: 'AI 응답 생성에 실패했습니다. 다시 시도해주세요.',
          type: 'ai',
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    },
    [selectedMemos, chatRoomId, createAiChatMutation],
  );

  // 메모 재생성 요청
  const handleRegenerate = useCallback(
    async (messageId: string) => {
      if (!chatRoomId) return;

      const aiMessage = messages.find((msg) => msg.id === messageId);
      if (!aiMessage || aiMessage.type !== 'ai') return;

      if (!aiMessage.memoIds || !aiMessage.userPrompt) {
        // eslint-disable-next-line no-console
        console.error('재생성에 필요한 정보가 없습니다.');
        return;
      }

      try {
        const response = await createAiChatMutation.mutateAsync({
          chatRoomId,
          body: {
            userPrompt: aiMessage.userPrompt,
            option: aiMessage.option,
            memoIds: aiMessage.memoIds,
          },
        });

        if (response.data) {
          const newAiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: response.data.content || '',
            title: response.data.title,
            type: 'ai',
            memoIds: aiMessage.memoIds,
            userPrompt: aiMessage.userPrompt,
            option: aiMessage.option,
          };
          setMessages((prev) =>
            insertMessageAfter(prev, messageId, newAiMessage),
          );
        }
      } catch (error) {
        console.error('AI 응답 재생성 실패:', error);
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: 'AI 응답 재생성에 실패했습니다. 다시 시도해주세요.',
          type: 'ai',
        };
        setMessages((prev) =>
          insertMessageAfter(prev, messageId, errorMessage),
        );
      }
    },
    [messages, chatRoomId, createAiChatMutation],
  );

  // 메모로 저장 요청
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

      const sourceMemoIds =
        message.memoIds || convertMemoIdsToNumbers(selectedMemos);

      try {
        await saveAiMemoMutation.mutateAsync({
          title: message.title,
          content: message.text,
          sourceMemoIds,
        });
        return true;
      } catch (error) {
        console.error('메모 저장 실패:', error);
        return false;
      }
    },
    [messages, selectedMemos, saveAiMemoMutation],
  );

  return {
    isOpen: isAIOpen,
    messages,
    isLoading,
    inputText,
    selectedOptionId,
    setInputText,
    setSelectedOptionId,
    handleClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  };
};
