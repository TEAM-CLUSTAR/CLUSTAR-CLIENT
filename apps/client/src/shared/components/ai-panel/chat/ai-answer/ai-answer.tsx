import { Icon } from '@cds/icon';

import * as styles from './ai-answer.css';

interface AiAnswerProps {
  content: string;
  selectedMemosCount?: number;
  onRegenerate: () => void;
  onSaveToMemo: () => void;
}

const AiAnswer = ({
  content,
  selectedMemosCount = 0,
  onRegenerate,
  onSaveToMemo,
}: AiAnswerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon name="ic_star" size={24} color="blue500" />
        <span className={styles.title}>AI 요약본</span>

        {selectedMemosCount > 0 && (
          <div className={styles.memoChip}>
            <span>사용된 메모</span>
            <span>+{selectedMemosCount}</span>
          </div>
        )}
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            type="button"
            aria-label="다시 생성"
            onClick={onRegenerate}
          >
            <Icon name="ic_refresh" size={24} color="grey700" />
          </button>
          <button
            className={styles.actionButton}
            type="button"
            aria-label="메모로 저장"
            onClick={onSaveToMemo}
          >
            <Icon name="ic_save" size={24} color="grey700" />
          </button>
        </div>
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default AiAnswer;
