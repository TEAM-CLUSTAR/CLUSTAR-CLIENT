import { Icon } from '@cds/icon';

import * as styles from './toolbar.css';

const ToolBar = () => {
  return (
    <div className={styles.toolBarContainer}>
      <div className={styles.imageFileContainer}>
        <Icon name="ic_img_36" size={36} />
        <Icon name="ic_file_36" size={36} />
      </div>
      <div className={styles.vertical} />
      <div className={styles.markDouwnContainer}>
        <Icon name="ic_bold" size={36} />
        <Icon name="ic_italic" size={36} />
        <Icon name="ic_underline" size={36} />
      </div>
    </div>
  );
};

export default ToolBar;
