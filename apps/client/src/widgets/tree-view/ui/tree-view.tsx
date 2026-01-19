import { Controls, EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react';

import { LabelTextType } from '@shared/types/label-type';
import { MemoInfoTypes } from '@shared/types/memo-info-type';

import { TreeMemoListNode } from '@features/tree-view';
import { TreeBaseMemoNode } from '@features/tree-view';
import { TreeCustomEdgeLabel } from '@features/tree-view';
import { TreeCustomEdgeNoLabel } from '@features/tree-view';

import { createNodeEdge } from '../model/createNodeEdge';

import '@xyflow/react/dist/style.css';
import * as styles from './tree-view.css';

const nodeTypes: NodeTypes = {
  treeMemo: TreeMemoListNode,
  baseMemo: TreeBaseMemoNode,
};

const edgeTypes: EdgeTypes = {
  'custom-edge-label': TreeCustomEdgeLabel,
  'custom-edge-no-label': TreeCustomEdgeNoLabel,
};

interface TreeViewDataTypes {
  labelName: LabelTextType;
  memos: MemoInfoTypes[];
}

interface TreeViewProps {
  data: TreeViewDataTypes[];
}

const TreeView = ({ data }: TreeViewProps) => {
  const { nodes, edges } = createNodeEdge(data);
  return (
    <div className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.6}
        maxZoom={0.9}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeView;
