import { TextContent } from '@cds/ui';

import * as styles from './ai-message-bubble.css';

interface AiMessageBubbleProps {
  title: string;
  content: string;
}

const AiMessageBubble = ({ title, content }: AiMessageBubbleProps) => {
  return (
    <div className={styles.aiMessageBubble}>
      <TextContent
        isAiResult={true}
        mode="prompt"
        title={title}
        content={content}
      />
    </div>
  );
};

export default AiMessageBubble;
