import { Icon } from '@cds/icon';

import { Message } from '../../types/ai-prompt-types';
import AiAnswer from '../ai-answer/ai-answer';
import AiPanelEmpty from '../ai-panel-empty/ai-panel-empty';
import UserMessage from '../user-message/user-message';

import * as styles from './ai-panel-messages.css';

interface AiPanelMessagesProps {
  answerGeneratingMemoCount: number;
  isDragOver: boolean;
  messages: Message[];
  onRegenerate: (messageId: string) => void;
  onSaveToMemo: (messageId: string) => void;
  shouldShowLoadingMessage: boolean;
}

const getUsedMemosCount = (message: Message) => {
  return message.memoIds?.length ?? 0;
};

const AiPanelMessages = ({
  answerGeneratingMemoCount,
  isDragOver,
  messages,
  onRegenerate,
  onSaveToMemo,
  shouldShowLoadingMessage,
}: AiPanelMessagesProps) => {
  const hasMessages = messages.length > 0;

  if (isDragOver) {
    return <AiPanelEmpty isDragOver />;
  }

  return (
    <>
      {!hasMessages && !shouldShowLoadingMessage && (
        <AiPanelEmpty isDragOver={isDragOver} />
      )}
      {messages.map((message) => {
        if (message.type === 'user') {
          return (
            <div key={message.id} className={styles.userMessage}>
              <UserMessage content={message.text} />
            </div>
          );
        }

        return (
          <AiAnswer
            key={message.id}
            content={message.text}
            usedMemosCount={getUsedMemosCount(message)}
            onRegenerate={() => onRegenerate(message.id)}
            onSaveToMemo={() => onSaveToMemo(message.id)}
          />
        );
      })}

      {shouldShowLoadingMessage && (
        <div className={styles.loadingMessage}>
          <Icon name="ic_ai" size={24} color="grey500" />
          <span className={styles.loadingMessageText}>
            {answerGeneratingMemoCount}개의 메모를 바탕으로 결과물을
            생성중이에요...
          </span>
        </div>
      )}
    </>
  );
};

export default AiPanelMessages;
