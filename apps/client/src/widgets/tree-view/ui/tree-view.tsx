import { useEffect, useState } from 'react';
import { Controls, EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react';

import { useLayoutUI } from '@shared/layouts/layout-ui-context';

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
  MIN: 0.5,
  MAX: 0.9,
};

const TreeView = () => {
  const { data: memos = [] } = useReadMemoStructure();
  const groupedMemos = groupByLabelName(memos);
  const sortedMemos = convertGroupToNodeEdgeData(groupedMemos);
  const { nodes, edges } = createNodeEdge(sortedMemos);
  const { isExpanded, isTreeViewOpen } = useLayoutUI();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isTreeViewOpen && !isExpanded) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [isTreeViewOpen, isExpanded]);

  return (
    <div className={styles.container}>
      {isReady ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
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
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
};

export default TreeView;
