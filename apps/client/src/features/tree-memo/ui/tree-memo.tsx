import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
} from '@entities/memo/models/constant';

import * as styles from './tree-memo.css';

interface TreeMemoProps {
  labelName: LabelTextType;
  title: string;
  content: string;
}

const TreeMemo = ({ labelName, title, content }: TreeMemoProps) => {
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];

  return (
    <div className={styles.container({ labelColor })}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default TreeMemo;
