import { type BuiltInEdge, type Edge, type Node } from '@xyflow/react';

import { StructureMemoTypes } from '@shared/types/memo-info-type';

interface TreeSourceTypes {
  tagName: string;
  tagColor: string;
  memos: StructureMemoTypes[];
}

interface GroupedTag {
  tagColor: string;
  memos: StructureMemoTypes[];
}

const NO_TAG = '태그없음';
const DISCOUNT = {
  IS_NO_TAG: 2,
  IS_TAG: 1,
};
const BASE_NODE_POSITION = {
  X: 34,
  Y: 0,
};
const X_SPACING = 400;
const Y_SPACING = 300;

export const buildTreeGraph = (memos: StructureMemoTypes[]) => {
  const grouped = groupByTagName(memos);
  const converted = convertMemoToTreeData(grouped);
  return createNodeEdge(converted);
};

const groupByTagName = (memos: StructureMemoTypes[]) => {
  return memos.reduce<Record<string, GroupedTag>>((acc, memo) => {
    const tags = memo.tagList?.length
      ? memo.tagList
      : [{ tagId: 0, name: NO_TAG, color: '' }];

    tags.forEach(({ name, color }) => {
      const group = (acc[name] ??= { tagColor: color, memos: [] });
      group.memos.push(memo);
    });

    return acc;
  }, {});
};

const convertMemoToTreeData = (
  grouped: Record<string, GroupedTag>,
): TreeSourceTypes[] => {
  return Object.entries(grouped).map(([tagName, { tagColor, memos }]) => ({
    tagName,
    tagColor,
    memos,
  }));
};

const createNodeEdge = (data: TreeSourceTypes[]) => {
  const nodes: Node[] = [
    {
      id: 'baseNode',
      position: { x: BASE_NODE_POSITION.X, y: BASE_NODE_POSITION.Y },
      data: {},
      type: 'baseMemo',
    },
  ];
  const edges: (Edge | BuiltInEdge)[] = [];

  const isNoTag = data.some(({ tagName }) => tagName === NO_TAG);
  const sortedData = [...data].sort((a, b) => {
    if (a.tagName === NO_TAG) return 1;
    if (b.tagName === NO_TAG) return -1;
    return 0;
  });
  const dataCount = sortedData.length;
  const discounter = isNoTag ? DISCOUNT.IS_NO_TAG : DISCOUNT.IS_TAG;
  const centerOffset = (dataCount - discounter) / 2;

  sortedData.forEach(({ tagName, tagColor, memos }, index) => {
    // sortedData는 태그 없음 그룹이 항상 마지막에 오도록 정렬되어 있음 → 마지막 노드만 커스텀 엣지로 연결
    const isNoTagMemo = index === dataCount - 1 && isNoTag;
    const centeredX = (index - centerOffset) * X_SPACING;

    nodes.push({
      id: tagName,
      type: 'treeMemo',
      position: {
        x: centeredX,
        y: Y_SPACING,
      },
      data: {
        tagName,
        tagColor,
        memos,
      },
    });

    edges.push({
      id: `e-baseNode-${tagName}`,
      source: 'baseNode',
      target: tagName,
      type: isNoTagMemo ? 'customEdge' : 'smoothstep',
      sourceHandle: isNoTagMemo ? 'baseRight' : 'baseBottom',
    });
  });

  return { nodes, edges };
};
