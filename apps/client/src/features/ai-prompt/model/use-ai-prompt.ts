import { useCallback, useEffect, useRef, useState } from 'react';

import { Message, UseAiPromptProps } from './types';

interface UseMessagesScrollProps {
  messages: Message[];
  isLoading: boolean;
}

// 자동 스크롤 로직
export const useMessagesScroll = ({
  messages,
  isLoading,
}: UseMessagesScrollProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const scrollToBottom = () => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 100);
    };

    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      if (lastMessage.type === 'ai' && !isLoading) {
        scrollToBottom();
      } else if (isLoading) {
        scrollToBottom();
      }
    }
  }, [messages, isLoading]);

  return messagesEndRef;
};

// AI 프롬프트 사용자 정의 훅
export const useAiPrompt = ({
  isAIOpen,
  selectedMemos,
  handleClose,
}: UseAiPromptProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const messagesEndRef = useMessagesScroll({ messages, isLoading });

  // AI 프롬프트 입력 요청
  const handleSubmit = useCallback(
    async (value: { text: string; selectedOptionId: string | null }) => {
      if (!value.text.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: value.text.trim(),
        type: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);

      // eslint-disable-next-line no-console
      console.log('프롬프트 전송:', {
        text: value.text,
        selectedOptionId: value.selectedOptionId,
        selectedMemos,
      });

      setIsLoading(true);

      // TODO: API 요청 처리
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: '첫째, 북극성 지표를 구체화해야 한다. 이는 서비스가 궁극적으로 전달하고자 하는 핵심 가치를 수치로 표현하는 단계로, 예를 들어 "AI 결과물 생성률"처럼 사용자 가치와 직접 연결된 지표를 설정하는 것이 목표다.',
          title: '6차 세미나',
          type: 'ai',
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 3000);

      setInputText('');
      setSelectedOptionId(null);
    },
    [selectedMemos],
  );

  // 메모 재생성 요청
  const handleRegenerate = useCallback(async (messageId: string) => {
    // eslint-disable-next-line no-console
    console.log('재생성 요청:', messageId);
    // TODO: API 요청 처리
  }, []);

  // 메모로 저장 요청
  const handleSaveToMemo = useCallback(async (messageId: string) => {
    // eslint-disable-next-line no-console
    console.log('메모로 저장:', messageId);
    // TODO: API 요청 처리
  }, []);

  // AI 프롬프트 닫기
  const handlePromptClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return {
    isOpen: isAIOpen,
    messages,
    isLoading,
    inputText,
    selectedOptionId,
    messagesEndRef,
    setInputText,
    setSelectedOptionId,
    handlePromptClose,
    handleSubmit,
    handleRegenerate,
    handleSaveToMemo,
  };
};
