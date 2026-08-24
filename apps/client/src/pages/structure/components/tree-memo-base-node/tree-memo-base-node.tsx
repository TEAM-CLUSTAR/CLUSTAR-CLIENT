import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import * as styles from './tree-memo-base-node.css';

type EmptyNodeDataTypes = Record<string, never>;
type TreeMemoBaseNodeDataTypes = Node<EmptyNodeDataTypes, 'initial'>;

const TreeMemoBaseNode = ({
  isConnectable,
}: NodeProps<TreeMemoBaseNodeDataTypes>) => {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.text}>전체 메모</span>
      </div>

      <Handle
        id="baseRight"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className={styles.handle}
      />

      <Handle
        id="baseBottom"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={styles.handle}
      />
    </div>
  );
};

export default memo(TreeMemoBaseNode);
