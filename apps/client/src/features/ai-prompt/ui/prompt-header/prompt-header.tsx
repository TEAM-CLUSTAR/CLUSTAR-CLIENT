import { Icon } from '@cds/icon';

import * as styles from './prompt-header.css';

interface AiPromptHeaderProps {
  handleClose: () => void;
}

const AiPromptHeader = ({ handleClose }: AiPromptHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <Icon name="ic_ai_blue_36" width={36} height={36} />
        <h3 className={styles.title}>AI 생성하기</h3>
      </div>
      <button onClick={handleClose} type="button" aria-label="닫기">
        <Icon name="ic_close" width={28} height={28} />
      </button>
    </header>
  );
};

export default AiPromptHeader;
