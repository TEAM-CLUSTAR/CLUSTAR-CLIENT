import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import * as styles from './ai-panel-header.css';

interface AiPanelHeaderProps {
  titleId: string;
  onCreateNewChat: () => void;
  onClose: () => void;
}

const AiPanelHeader = ({
  titleId,
  onCreateNewChat,
  onClose,
}: AiPanelHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <Icon name="ic_ai" size={32} color="grey800" />
        <h2 id={titleId} className={styles.title}>
          AI 생성하기
        </h2>
      </div>
      <div className={styles.headerActions}>
        <div className={styles.actionContainer}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="새 대화창"
            onClick={onCreateNewChat}
          >
            <Icon name="ic_plus" size={24} color="grey600" />
          </button>
          <div className={styles.tooltip({ align: 'center' })}>
            <Tooltip title="새 대화창" />
          </div>
        </div>
        <div className={styles.actionContainer}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="AI 패널 닫기"
            onClick={onClose}
          >
            <Icon name="ic_close" size={24} color="grey600" />
          </button>
          <div className={styles.tooltip({ align: 'end' })}>
            <Tooltip title="AI 패널 닫기" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AiPanelHeader;
