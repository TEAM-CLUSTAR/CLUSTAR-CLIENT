import { Controls, EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react';

import { useReadMemoStructure } from './apis/queries';
import {
  TreeBaseMemoNode,
  TreeCustomEdgeLabel,
  TreeCustomEdgeNoLabel,
  TreeMemoListNode,
} from './components';
import {
  convertGroupToNodeEdgeData,
  groupByLabelName,
} from './utils/convert-memos-data';
import { createNodeEdge } from './utils/create-node-edge';

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
  MIN: 0.5,
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
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={(e) => {
          e.stopPropagation();
        }}
        nodeDragThreshold={100}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeView;
