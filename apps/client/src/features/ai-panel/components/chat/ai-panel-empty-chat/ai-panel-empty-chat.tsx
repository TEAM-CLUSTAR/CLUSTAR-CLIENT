import { Icon } from '@cds/icon';

import * as styles from './ai-panel-empty-chat.css';

const AiPanelEmptyChat = () => {
  return (
    <div className={styles.container}>
      <Icon name="ic_star_gra" size={48} />
      <p className={styles.text}>새 메모에 대해서 질문해보세요.</p>
    </div>
  );
};

export default AiPanelEmptyChat;
