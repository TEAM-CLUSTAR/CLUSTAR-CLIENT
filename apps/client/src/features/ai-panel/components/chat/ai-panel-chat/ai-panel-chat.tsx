import { useEffect, useRef } from 'react';

import { Icon } from '@cds/icon';

import { AiPanelMessage } from '../../../types/ai-panel.types';
import AiAnswer from '../ai-answer/ai-answer';
import AiPanelEmptyChat from '../ai-panel-empty-chat/ai-panel-empty-chat';

import * as styles from './ai-panel-chat.css';

interface AiPanelChatProps {
  messages: AiPanelMessage[];
  isAnswerLoading: boolean;
  answerGeneratingMemoCount: number;
  onRegenerate: (messageId: string) => void;
  onSaveToMemo: (messageId: string) => void;
}

const AiPanelChat = ({
  messages,
  isAnswerLoading,
  answerGeneratingMemoCount,
  onRegenerate,
  onSaveToMemo,
}: AiPanelChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea) return;

    const animationFrameId = requestAnimationFrame(() => {
      chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth',
      });
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [messages, isAnswerLoading]);

  return (
    <div ref={chatAreaRef} className={styles.chatArea}>
      {messages.length === 0 ? (
        <AiPanelEmptyChat />
      ) : (
        messages.map((message) =>
          message.type === 'user' ? (
            <p key={message.id} className={styles.userMessage}>
              {message.text}
            </p>
          ) : (
            <AiAnswer
              key={message.id}
              content={message.text}
              usedMemosCount={message.memoIds?.length ?? 0}
              onRegenerate={() => onRegenerate(message.id)}
              onSaveToMemo={() => onSaveToMemo(message.id)}
            />
          ),
        )
      )}

      {isAnswerLoading && (
        <div className={styles.loadingMessage}>
          <Icon name="ic_ai" size={24} color="grey500" />
          <span>
            {answerGeneratingMemoCount}개의 메모를 바탕으로 결과물을
            생성중이에요...
          </span>
        </div>
      )}
    </div>
  );
};

export default AiPanelChat;
