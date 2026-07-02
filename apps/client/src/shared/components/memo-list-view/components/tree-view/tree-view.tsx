import {
  BuiltInEdge,
  Controls,
  DefaultEdgeOptions,
  EdgeTypes,
  NodeTypes,
  ReactFlow,
} from '@xyflow/react';

import { themeVars } from '@cds/ui';

import { useReadMemoStructure } from './apis/queries';
import { CustomEdge, TreeBaseMemoNode, TreeMemoListNode } from './components';
import {
  convertGroupToNodeEdgeData,
  groupByLabelName,
} from './utils/convert-memos-data';
import { createNodeEdge } from './utils/create-node-edge';

import '@xyflow/react/dist/style.css';
import * as styles from './tree-view.css';

const ZOOM = {
  MIN: 0.5,
  MAX: 0.9,
};

const nodeTypes: NodeTypes = {
  treeMemo: TreeMemoListNode,
  baseMemo: TreeBaseMemoNode,
};
const edgeTypes: EdgeTypes = {
  'custom-edge-no-label': CustomEdge,
};
const defaultEdgeOptions: DefaultEdgeOptions | Partial<BuiltInEdge> = {
  type: 'smoothstep',
  style: { strokeWidth: '0.1rem', stroke: themeVars.color.grey400 },
  pathOptions: { borderRadius: 30 },
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
        defaultEdgeOptions={defaultEdgeOptions}
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
