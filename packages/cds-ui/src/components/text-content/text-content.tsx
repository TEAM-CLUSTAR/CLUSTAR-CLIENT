import { Icon } from '@cds/icon';

import Title from '../title/title';

import * as styles from './text-content.css';

export interface TextContentProps {
  isAiOutput: boolean;
  isPreview: boolean;
  title: string;
  content: string;
}

const TextContent = ({
  isAiOutput,
  isPreview,
  title,
  content,
}: TextContentProps) => {
  const containerSize = isPreview ? 'sm' : 'lg';

  return (
    <article className={styles.container({ size: containerSize })}>
      {isAiOutput ? (
        <div className={styles.headerContainer}>
          <Icon
            name="ic_ai_blue_40"
            width={40}
            height={40}
            className={styles.icon}
          ></Icon>
          <div>
            <h3 className={styles.aiSummary}>AI 요약본</h3>
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
