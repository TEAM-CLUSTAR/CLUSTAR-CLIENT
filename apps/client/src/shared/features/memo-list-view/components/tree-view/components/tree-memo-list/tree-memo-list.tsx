import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import { TreeMemo } from '@entities/tree-view';

import * as styles from './tree-memo-list.css';

export interface TreeMemoListProps {
  labelName: LabelTextType;
  memos: StructureMemoTypes[];
}

const TreeMemoList = ({ labelName, memos }: TreeMemoListProps) => {
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];

  return (
    <div className={styles.container({ labelColor })}>
      <span className={styles.title({ labelColor })}>{labelName}</span>
      <div className={styles.memosContainer}>
        {memos.map((memo) => (
          <TreeMemo key={memo.memoId} memo={memo} />
        ))}
      </div>
    </div>
  );
};

export default TreeMemoList;
