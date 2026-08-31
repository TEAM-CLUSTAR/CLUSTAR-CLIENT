import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import TreeCustomHandle from '../tree-custom-handle/tree-custom-handle';

import * as styles from './tree-base-memo-node.css';

type EmptyNodeDataTypes = Record<string, never>;
type TreeBaseMemoNodeDataTypes = Node<EmptyNodeDataTypes, 'initial'>;

const TreeBaseMemoNode = ({
  isConnectable,
}: NodeProps<TreeBaseMemoNodeDataTypes>) => {
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
        style={{
          background: 'none',
          border: 'none',
          width: 'min-content',
          height: 'min-content',
        }}
      >
        <TreeCustomHandle labelColor={'grey'} isBaseMemo={true} />
      </Handle>

      <Handle
        id="baseBottom"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          background: 'none',
          border: 'none',
          width: 'min-content',
          height: 'min-content',
        }}
      >
        <TreeCustomHandle labelColor={'grey'} isBaseMemo={true} />
      </Handle>
    </div>
  );
};

export default memo(TreeBaseMemoNode);
