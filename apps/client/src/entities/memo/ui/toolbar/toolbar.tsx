import { Icon } from '@cds/icon';

import * as styles from './toolbar.css';

const ToolBar = () => {
  return (
    <div className={styles.toolBarContainer}>
      <div className={styles.imageFileContainer}>
        <Icon name="ic_img_36" width={36} height={36} />
        <Icon name="ic_file_36" width={36} height={36} />
      </div>
      <div className={styles.vertical} />
      <div className={styles.markDouwnContainer}>
        <Icon name="ic_bold" width={36} height={36} />
        <Icon name="ic_italic" width={36} height={36} />
        <Icon name="ic_underline" width={36} height={36} />
      </div>
    </div>
  );
};

export default ToolBar;
