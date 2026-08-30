import { Icon } from '@cds/icon';

import * as styles from './file.css';

// TODO: memo-editor.tsx의 MemoEditorFile을 import하는 상위 브랜치에서
// 이 로컬 타입을 지우고 그쪽 타입으로 교체해주세요.
interface MemoEditorFile {
  fileUrl: string;
  fileName: string;
  fileSize: string;
}

interface FileProps {
  file: MemoEditorFile;
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
