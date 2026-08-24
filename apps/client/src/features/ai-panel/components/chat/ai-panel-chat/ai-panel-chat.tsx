import { Icon } from '@cds/icon';

import { AiPanelMessage } from '../../../types/types';
import AiAnswer from '../ai-answer/ai-answer';

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
  return (
    <div className={styles.chatArea}>
      {messages.length === 0 ? (
        <div className={styles.empty}>
          <Icon name="ic_star_gra" size={48} />
          <p className={styles.emptyText()}>새 메모에 대해서 질문해보세요.</p>
        </div>
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
