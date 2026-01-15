import { Icon } from '@cds/icon';

import Title from '../title/title';

import * as styles from './text-content.css';

export interface TextContentProps {
  isAiResult: boolean;
  mode: 'detail' | 'prompt';
  title: string;
  content: string;
}

const TextContent = ({
  isAiResult,
  mode,
  title,
  content,
}: TextContentProps) => {
  return (
    <article className={styles.container({ type: mode })}>
      {isAiResult ? (
        <div className={styles.headerContainer}>
          <Icon
            name="ic_ai_blue_40"
            width={40}
            height={40}
            className={styles.icon}
          />
          <div>
            <p className={styles.aiSummary}>AI 요약본</p>
            <Title title={title} />
          </div>
        </div>
      ) : (
        <Title title={title} />
      )}

      <p className={styles.content}>{content}</p>
    </article>
  );
};

export default TextContent;
