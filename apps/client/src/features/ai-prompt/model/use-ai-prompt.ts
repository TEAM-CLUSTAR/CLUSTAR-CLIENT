import { useCallback, useState } from 'react';

import { Message, UseAiPromptProps } from './types';

// API 연동할 때 변경 예정 (테스트용)
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

  // AI 프롬프트 입력 요청
  const handleSubmit = useCallback(
    async (value: {
      text: string;
      selectedOptionId: string | null;
      skipUserMessage?: boolean;
    }) => {
      if (!value.text.trim()) return;

      if (!value.skipUserMessage) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: value.text.trim(),
          type: 'user',
        };
        setMessages((prev) => [...prev, userMessage]);
      }

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

      if (!value.skipUserMessage) {
        setInputText('');
        setSelectedOptionId(null);
      }
    },
    [selectedMemos],
  );

  // 메모 재생성 요청
  const handleRegenerate = useCallback(
    async (messageId: string) => {
      if (selectedMemos.length === 0) return;

      const messageIndex = messages.findIndex((msg) => msg.id === messageId);
      if (messageIndex === -1) return;

      let userMessage: Message | null = null;
      for (let i = messageIndex - 1; i >= 0; i--) {
        if (messages[i].type === 'user') {
          userMessage = messages[i];
          break;
        }
      }

      if (!userMessage) return;

      await handleSubmit({
        text: userMessage.text,
        selectedOptionId: null,
        skipUserMessage: true,
      });
    },
    [messages, selectedMemos, handleSubmit],
  );

  // 메모로 저장 요청
  const handleSaveToMemo = useCallback(async (messageId: string) => {
    // eslint-disable-next-line no-console
    console.log('메모로 저장:', messageId);
    // TODO: API 요청 처리
  }, []);

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
