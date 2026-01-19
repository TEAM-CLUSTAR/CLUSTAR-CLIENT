import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import TreeBaseMemo from '../tree-base-memo/tree-base-memo';
import TreeCustomHandle from '../tree-custom-handle/tree-custom-handle';

type EmptyNodeDataTypes = Record<string, never>;
type TreeBaseMemoNodeDataTypes = Node<EmptyNodeDataTypes, 'initial'>;

const TreeBaseMemoNode = ({
  isConnectable,
}: NodeProps<TreeBaseMemoNodeDataTypes>) => {
  return (
    <div>
      <TreeBaseMemo />

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
