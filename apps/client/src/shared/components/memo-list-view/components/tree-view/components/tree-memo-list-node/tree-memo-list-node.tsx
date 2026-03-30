import { memo } from 'react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import TreeCustomHandle from '../tree-custom-handle/tree-custom-handle';
import TreeMemoList from '../tree-memo-list/tree-memo-list';

type TreeMemoListNodeDataTypes = Node<
  {
    labelName: LabelTextType;
    memos: StructureMemoTypes[];
  },
  'memo'
>;

const TreeMemoListNode = ({
  data,
  isConnectable,
}: NodeProps<TreeMemoListNodeDataTypes>) => {
  const { labelName, memos } = data;
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];

  return (
    <div>
      <Handle
        id="treeMemoHandle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          background: 'none',
          border: 'none',
          width: 'min-content',
          height: 'min-content',
        }}
      >
        <TreeCustomHandle labelColor={labelColor} />
      </Handle>

      <TreeMemoList labelName={labelName} memos={memos} />
    </div>
  );
};

export default memo(TreeMemoListNode);
