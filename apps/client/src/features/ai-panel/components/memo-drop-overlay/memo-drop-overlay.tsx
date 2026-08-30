import { Icon } from '@cds/icon';

import * as styles from './memo-drop-overlay.css';

const MemoDropOverlay = () => {
  return (
    <div className={styles.overlay}>
      <Icon name="ic_memo_36" size={36} className={styles.iconBox} />
      <p className={styles.text}>메모를 해당 패널로 드롭해주세요.</p>
    </div>
  );
};

export default MemoDropOverlay;
