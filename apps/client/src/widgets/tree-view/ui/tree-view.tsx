import { Controls, EdgeTypes, NodeTypes, ReactFlow } from '@xyflow/react';

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

const TreeView = () => {
  const { nodes, edges } = createNodeEdge([
    {
      labelName: 'SOPT',
      memos: [
        {
          id: 1,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 2,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 3,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 4,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
      ],
    },
    {
      labelName: '졸업 프로젝트',
      memos: [
        {
          id: 1,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 2,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 3,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 4,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
      ],
    },
    {
      labelName: '교양',
      memos: [
        {
          id: 1,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 2,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 3,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 4,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
      ],
    },
    {
      labelName: '레퍼런스',
      memos: [
        {
          id: 1,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 2,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 3,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 4,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
      ],
    },
    {
      labelName: '라벨없음',
      memos: [
        {
          id: 1,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 2,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 3,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
        {
          id: 4,
          labelList: {
            dateText: '2025-20-20',
            labelItems: [
              {
                id: 'idid',
                text: 'SOPT',
              },
            ],
          },
          textContent: {
            isAiResult: true,
            title: '제목임니다',
            content: '콘텐츠임니다.',
          },
        },
      ],
    },
  ]);
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
