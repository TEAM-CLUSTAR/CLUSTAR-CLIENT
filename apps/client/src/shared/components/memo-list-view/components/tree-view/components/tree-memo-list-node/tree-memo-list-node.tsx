import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import TreeMemo from './components/tree-memo/tree-memo';

import * as styles from './tree-memo-list-node.css';

type TreeMemoListNodeDataTypes = Node<
  {
    tagName: LabelTextType;
    memos: StructureMemoTypes[];
  },
  'memo'
>;

const TreeMemoListNode = ({
  data,
  isConnectable,
}: NodeProps<TreeMemoListNodeDataTypes>) => {
  const { tagName, memos } = data;
  const tagColor = LABEL_COLOR_BY_TEXT[tagName];

  return (
    <div>
      <Handle
        id="treeMemoHandle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={styles.handle({ tagColor })}
      />
      <div className={styles.container({ tagColor })}>
        <span className={styles.title({ tagColor })}>{tagName}</span>
        <div className={styles.memosContainer}>
          {memos.map((memo) => (
            <TreeMemo key={memo.memoId} memo={memo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TreeMemoListNode);
