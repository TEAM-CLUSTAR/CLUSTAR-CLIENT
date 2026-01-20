import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import * as styles from './tree-memo.css';

interface TreeMemoProps {
  labelName: LabelTextType;
  memo: StructureMemoTypes;
}

const TreeMemo = ({ labelName, memo }: TreeMemoProps) => {
  const { title, content } = memo;
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];

  return (
    <button type="button" className={styles.container({ labelColor })}>
      <span className={styles.title}>{title}</span>
      <span className={styles.content}>{content}</span>
    </button>
  );
};

export default TreeMemo;
