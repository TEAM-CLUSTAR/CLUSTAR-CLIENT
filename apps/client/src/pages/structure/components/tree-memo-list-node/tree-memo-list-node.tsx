import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import { NO_TAG_COLOR, TAG_COLOR_MATCH, type TagColorType } from '@cds/ui';

import { StructureMemoTypes } from '@shared/types/memo-info-type';

import TreeMemo from './components/tree-memo/tree-memo';

import * as styles from './tree-memo-list-node.css';

type TreeMemoListNodeDataTypes = Node<
  {
    tagName: string;
    tagColor: string;
    memos: StructureMemoTypes[];
  },
  'memo'
>;

const TreeMemoListNode = ({
  data,
  isConnectable,
}: NodeProps<TreeMemoListNodeDataTypes>) => {
  const { tagName, tagColor, memos } = data;
  const { backgroundColor, textColor } =
    TAG_COLOR_MATCH[tagColor as TagColorType] ?? NO_TAG_COLOR;

  return (
    <div>
      <Handle
        id="treeMemoHandle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={styles.handle}
        style={{ backgroundColor, border: `2px solid ${textColor}` }}
      />
      <div className={styles.container} style={{ backgroundColor }}>
        <span className={styles.title} style={{ color: textColor }}>
          {tagName}
        </span>
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
