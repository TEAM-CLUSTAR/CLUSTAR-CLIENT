import { useEffect, useRef } from 'react';

import { Icon } from '@cds/icon';

import { UserMessageBubble } from '@entities/message';

import AiMessageItem from '@features/ai-prompt/ui/ai-message/ai-message';

import { Message } from '../../model/types';

import * as styles from './prompt-messages-list.css';

interface AiMessagesListProps {
  messages: Message[];
  isLoading: boolean;
  selectedMemosCount: number;
  handleRegenerate: (messageId: string) => void;
  handleSaveToMemo: (messageId: string) => void;
}

const AiMessagesList = ({
  messages,
  isLoading,
  selectedMemosCount,
  handleRegenerate,
  handleSaveToMemo,
}: AiMessagesListProps) => {
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

    if (isLoading || messages[messages.length - 1]?.type === 'ai') {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  return (
    <div className={styles.container}>
      {messages.map((message) => {
        if (message.type === 'user') {
          return (
            <div key={message.id} className={styles.messageContainer}>
              <UserMessageBubble content={message.text} />
            </div>
          );
        }

        if (message.type === 'ai') {
          return (
            <AiMessageItem
              key={message.id}
              id={message.id}
              title={message.title || ''}
              content={message.text}
              handleRegenerate={handleRegenerate}
              handleSaveToMemo={handleSaveToMemo}
              selectedMemosCount={selectedMemosCount}
            />
          );
        }

        return null;
      })}

      {isLoading && (
        <div className={styles.loadingSection}>
          <Icon name="ic_ai_gra" width={36} height={36} />
          <span className={styles.loadingText}>
            {selectedMemosCount}개의 메모를 바탕으로 결과물을 생성중이에요.
          </span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AiMessagesList;
