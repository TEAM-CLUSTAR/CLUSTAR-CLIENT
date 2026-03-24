import { Button } from '@cds/ui';

import { AiMessageBubble } from '@entities/message';

import * as styles from './ai-message.css';

interface AiMessageProps {
  id: string;
  title: string;
  content: string;
  handleRegenerate: (messageId: string) => void;
  handleSaveToMemo: (messageId: string) => void;
  selectedMemosCount?: number;
}

const AiMessage = ({
  id,
  title,
  content,
  handleRegenerate,
  handleSaveToMemo,
  selectedMemosCount = 0,
}: AiMessageProps) => {
  const hasSelectedMemos = selectedMemosCount > 0;

  return (
    <div className={styles.container}>
      <AiMessageBubble title={title} content={content} />
      <div className={styles.actionButtons}>
        <Button
          onClick={() => handleRegenerate(id)}
          size="md"
          variant="outlined"
          disabled={!hasSelectedMemos}
        >
          재생성하기
        </Button>
        <Button onClick={() => handleSaveToMemo(id)} size="md">
          메모로 저장하기
        </Button>
      </div>
    </div>
  );
};

export default AiMessage;
