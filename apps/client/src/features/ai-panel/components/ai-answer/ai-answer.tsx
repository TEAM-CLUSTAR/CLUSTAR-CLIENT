import { useState } from 'react';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import UsedMemoBadge from './used-memo-badge/used-memo-badge';

import * as styles from './ai-answer.css';

interface AiAnswerProps {
  content: string;
  usedMemosCount?: number;
  onRegenerate: () => void;
  onSaveToMemo: () => void;
}

const AiAnswer = ({
  content,
  usedMemosCount = 0,
  onRegenerate,
  onSaveToMemo,
}: AiAnswerProps) => {
  const [isSaveTooltipVisible, setIsSaveTooltipVisible] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Icon name="ic_star" size={24} color="blue500" />
        <span className={styles.title}>AI 요약본</span>

        {usedMemosCount > 0 && <UsedMemoBadge count={usedMemosCount} />}
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            type="button"
            aria-label="다시 생성"
            onClick={onRegenerate}
          >
            <Icon name="ic_refresh" size={24} color="grey700" />
          </button>
          <div className={styles.actionContainer}>
            <button
              className={styles.actionButton}
              type="button"
              aria-label="메모 저장하기"
              onClick={onSaveToMemo}
              onMouseEnter={() => setIsSaveTooltipVisible(true)}
              onMouseLeave={() => setIsSaveTooltipVisible(false)}
              onFocus={() => setIsSaveTooltipVisible(true)}
              onBlur={() => setIsSaveTooltipVisible(false)}
            >
              <Icon name="ic_save" size={24} color="grey700" />
            </button>
            {isSaveTooltipVisible && (
              <div className={styles.tooltip}>
                <Tooltip title="메모 저장하기" />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default AiAnswer;
