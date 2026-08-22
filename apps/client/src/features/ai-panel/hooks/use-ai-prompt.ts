import { useCallback, useEffect, useRef, useState } from 'react';

import { Message, UseAiPromptProps } from '../types/ai-prompt-types';
import { insertMessageAfter as insertMessageAfterTarget } from '../utils/ai-message';
import { useAiChatRoom } from './use-ai-chat-room';
import { useAiResponseActions } from './use-ai-response-actions';

const MIN_LOADING_MESSAGE_DURATION = 800;

// AI 프롬프트 사용자 정의 훅
export const useAiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
  chatRoomId: externalChatRoomId,
}: UseAiPromptProps) => {
  const [answerGeneratingMemoCount, setAnswerGeneratingMemoCount] = useState(0);
  const [answerGeneratingMessageId, setAnswerGeneratingMessageId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const loadingStartedAtRef = useRef<number | null>(null);
  const [isLoadingMessageVisible, setIsLoadingMessageVisible] = useState(false);

  const { chatRoomId, isCreatingChatRoom, resetInternalChatRoom } =
    useAiChatRoom({
      isAIOpen,
      externalChatRoomId,
    });

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const insertMessageAfter = useCallback(
    (targetMessageId: string, message: Message) => {
      setMessages((prev) =>
        insertMessageAfterTarget(prev, targetMessageId, message),
      );
    },
    [],
  );

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const {
    isCreatingAiChat,
    isSavingAiMemo,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  } = useAiResponseActions({
    chatRoomId,
    messages,
    selectedMemos,
    addMessage,
    insertMessageAfter,
    onStartGenerating: setAnswerGeneratingMemoCount,
    onCreateGeneratingMessage: setAnswerGeneratingMessageId,
  });

  const isLoading = isCreatingChatRoom || isCreatingAiChat || isSavingAiMemo;
  const isAnswerGenerating = isCreatingAiChat;
  const shouldShowLoadingMessage =
    isAnswerGenerating || isLoadingMessageVisible;
  const visibleMessages = shouldShowLoadingMessage
    ? messages.filter((message) => message.id !== answerGeneratingMessageId)
    : messages;

  useEffect(() => {
    if (!isAIOpen) {
      resetMessages();
    }
  }, [isAIOpen, resetMessages]);

  useEffect(() => {
    if (isAnswerGenerating) {
      loadingStartedAtRef.current = Date.now();
      setIsLoadingMessageVisible(true);
      return;
    }

    if (!loadingStartedAtRef.current) {
      setIsLoadingMessageVisible(false);
      return;
    }

    const elapsedTime = Date.now() - loadingStartedAtRef.current;
    const remainingTime = Math.max(
      MIN_LOADING_MESSAGE_DURATION - elapsedTime,
      0,
    );

    const timeoutId = window.setTimeout(() => {
      setIsLoadingMessageVisible(false);
      loadingStartedAtRef.current = null;
    }, remainingTime);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAnswerGenerating]);

  const handleCreateNewChat = useCallback(() => {
    resetMessages();
    setAnswerGeneratingMemoCount(0);
    setAnswerGeneratingMessageId(null);
    setIsLoadingMessageVisible(false);
    loadingStartedAtRef.current = null;
    resetInternalChatRoom();
  }, [resetMessages, resetInternalChatRoom]);

  return {
    isOpen: isAIOpen,
    messages,
    isLoading,
    isAnswerGenerating,
    answerGeneratingMemoCount,
    answerGeneratingMessageId,
    shouldShowLoadingMessage,
    visibleMessages,
    handleClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
    handleCreateNewChat,
  };
};
