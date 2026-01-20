import { Controls, EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react';

import {
  TreeBaseMemoNode,
  TreeCustomEdgeLabel,
  TreeCustomEdgeNoLabel,
  TreeMemoListNode,
} from '@features/tree-view';

import { useReadMemoStructure } from '../api/queries';
import {
  convertGroupToNodeEdgeData,
  groupByLabelName,
} from '../model/convert-memos-data';
import { createNodeEdge } from '../model/create-node-edge';

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

const ZOOM = {
  MIN: 0.6,
  MAX: 0.9,
};

const TreeView = () => {
  const { data: memos = [] } = useReadMemoStructure();
  const groupedMemos = groupByLabelName(memos);
  const sortedMemos = convertGroupToNodeEdgeData(groupedMemos);
  const { nodes, edges } = createNodeEdge(sortedMemos);

  return (
    <div className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={ZOOM.MIN}
        maxZoom={ZOOM.MAX}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeView;
