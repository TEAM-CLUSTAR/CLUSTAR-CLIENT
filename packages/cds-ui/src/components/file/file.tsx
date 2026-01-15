import { Icon } from '@cds/icon';

import * as styles from './file.css';

export interface FileProps {
  fileName: string;
  fileSize: string;
  fileUrl: string;
}

const file = ({ fileName, fileSize, fileUrl }: FileProps) => {
  return (
    <a
      className={styles.container}
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className={styles.icon} name="ic_pdf" width={44} height={44} />
      <div className={styles.fileContentContainer}>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.fileSize}>{fileSize}</span>
      </div>
    </a>
  );
};

export default file;
