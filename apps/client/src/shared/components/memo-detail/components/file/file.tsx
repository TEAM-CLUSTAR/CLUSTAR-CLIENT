import { Icon } from '@cds/icon';

import { MemoDetailFile } from '../../memo-detail';

import * as styles from './file.css';

interface FileProps {
  file: MemoDetailFile;
}

const File = ({ file }: FileProps) => {
  const { fileUrl, fileName, fileSize } = file;

  return (
    <a
      className={styles.container}
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="ic_file" size={24} color="grey700" />
      <span className={styles.fileName}>{fileName}</span>
      <span className={styles.fileSize}>{fileSize}</span>
    </a>
  );
};

export default File;
