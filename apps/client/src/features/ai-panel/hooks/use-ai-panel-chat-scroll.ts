import { useEffect, useRef } from 'react';

import type { AiPanelMessage } from '../types/ai-panel.types';

interface UseAiPanelChatScrollParams {
  messages: AiPanelMessage[];
  isAnswerLoading: boolean;
}

export const useAiPanelChatScroll = ({
  messages,
  isAnswerLoading,
}: UseAiPanelChatScrollParams) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const answerRefs = useRef(new Map<string, HTMLDivElement>());
  const previousMessageIdsRef = useRef(new Set<string>());
  const hasInitializedMessagesRef = useRef(false);

  const setAnswerRef = (messageId: string, element: HTMLDivElement | null) => {
    if (element) {
      answerRefs.current.set(messageId, element);
      return;
    }

    answerRefs.current.delete(messageId);
  };

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    const previousMessageIds = previousMessageIdsRef.current;
    const addedAiMessage = messages.find(
      (message) => message.type === 'ai' && !previousMessageIds.has(message.id),
    );

    previousMessageIdsRef.current = new Set(
      messages.map((message) => message.id),
    );

    if (messages.length === 0) {
      hasInitializedMessagesRef.current = false;
      return;
    }

    const isInitialMessageLoad = !hasInitializedMessagesRef.current;
    hasInitializedMessagesRef.current = true;

    if (!isInitialMessageLoad && !addedAiMessage && !isAnswerLoading) return;

    const animationFrameId = requestAnimationFrame(() => {
      if (!isInitialMessageLoad && addedAiMessage) {
        const answer = answerRefs.current.get(addedAiMessage.id);

        if (answer) {
          const answerTop =
            answer.getBoundingClientRect().top -
            chatArea.getBoundingClientRect().top +
            chatArea.scrollTop;

          chatArea.scrollTo({
            top: answerTop,
            behavior: 'smooth',
          });
          return;
        }
      }

      chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth',
      });
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [messages, isAnswerLoading]);

  return { chatAreaRef, setAnswerRef };
};
