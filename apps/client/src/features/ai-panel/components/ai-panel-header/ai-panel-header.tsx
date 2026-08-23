import { useState } from 'react';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import * as styles from './ai-panel-header.css';

interface AiPanelHeaderProps {
  onClose: () => void;
  onCreateNewChat: () => void;
}

const AiPanelHeader = ({ onClose, onCreateNewChat }: AiPanelHeaderProps) => {
  const [isCreateTooltipVisible, setIsCreateTooltipVisible] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <Icon name="ic_ai" size={32} color="grey800" />
        <h2 className={styles.title}>AI 생성하기</h2>
      </div>
      <div className={styles.actions}>
        <div className={styles.actionContainer}>
          <button
            type="button"
            className={styles.actionButton}
            aria-label="새 대화창"
            onClick={onCreateNewChat}
            onMouseEnter={() => setIsCreateTooltipVisible(true)}
            onMouseLeave={() => setIsCreateTooltipVisible(false)}
            onFocus={() => setIsCreateTooltipVisible(true)}
            onBlur={() => setIsCreateTooltipVisible(false)}
          >
            <Icon name="ic_plus" size={24} color="grey600" />
          </button>
          {isCreateTooltipVisible && (
            <div className={styles.tooltip}>
              <Tooltip title="새 대화창" />
            </div>
          )}
        </div>
        <button
          type="button"
          className={styles.actionButton}
          aria-label="AI 패널 닫기"
          onClick={onClose}
        >
          <Icon name="ic_close" size={24} color="grey600" />
        </button>
      </div>
    </header>
  );
};

export default AiPanelHeader;
