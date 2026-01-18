import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { MemoInfoTypes } from '@shared/types/memo-info-type';

import { TreeMemo } from '@entities/tree-view';

import * as styles from './tree-memo-list.css';

interface TreeMemoListProps {
  labelName: LabelTextType;
  memos: MemoInfoTypes[];
}

const TreeMemoList = ({ labelName, memos }: TreeMemoListProps) => {
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];

  return (
    <div className={styles.container({ labelColor })}>
      <span className={styles.title({ labelColor })}>{labelName}</span>
      <div className={styles.memosContainer}>
        {memos.map((memo) => (
          <TreeMemo key={memo.id} labelName={labelName} {...memo} />
        ))}
      </div>
    </div>
  );
};

export default TreeMemoList;
