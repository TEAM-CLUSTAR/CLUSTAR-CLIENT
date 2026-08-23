import { Icon } from '@cds/icon';

import * as styles from './ai-panel-empty.css';

interface AiPanelEmptyProps {
  isDragOver: boolean;
}

const AiPanelEmpty = ({ isDragOver }: AiPanelEmptyProps) => {
  return (
    <div className={styles.container}>
      {isDragOver ? (
        <Icon name="ic_memo_blue" size={48} />
      ) : (
        <Icon name="ic_star_gra" size={48} />
      )}
      <p className={styles.text({ isDragOver })}>
        {isDragOver
          ? '메모를 해당 패널로 드롭해주세요'
          : '새 메모에 대해서 질문해보세요.'}
      </p>
    </div>
  );
};

export default AiPanelEmpty;
