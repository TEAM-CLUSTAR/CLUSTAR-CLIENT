import { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  // 사이드바가 완전히 닫힌 후에만 트리뷰 준비
  useEffect(() => {
    if (isTreeViewOpen && !isExpanded) {
      // 사이드바가 완전히 닫혀있을 때 준비
      // 사이드바 애니메이션 완료 후 준비 (400ms)
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // 사이드바가 아직 열려있거나 닫히는 중이면 로딩 유지
      setIsReady(false);
    }
  }, [isTreeViewOpen, isExpanded]);

  return (
    <div ref={containerRef} className={styles.container}>
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
