import type { Edge, Node } from '@xyflow/react';

import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

interface NodeEdgeTypes {
  labelName: LabelTextType;
  memos: StructureMemoTypes[];
}

const NO_LABEL = '라벨없음';
const DISCOUNT = {
  IS_NO_LABEL: 2,
  IS_LABEL: 1,
};

const X_SPACING = 400;
const Y_SPACING = 300;

export const createNodeEdge = (data: NodeEdgeTypes[]) => {
  const nodes: Node[] = [
    {
      id: 'baseNode',
      position: { x: 34, y: 0 },
      data: {},
      type: 'baseMemo',
    },
  ];
  const edges: Edge[] = [];

  const isNoLabel = data.some(({ labelName }) => labelName === NO_LABEL)
    ? true
    : false;
  const sortedData = data.sort((a, b) => {
    if (a.labelName === NO_LABEL) return 1;
    if (b.labelName === NO_LABEL) return -1;
    return 0;
  });
  const dataCount = sortedData.length;

  sortedData.forEach(({ labelName, memos }, index) => {
    const isNoLabelMemo = index === dataCount - 1 && isNoLabel;
    const discountNoLabel = isNoLabel
      ? DISCOUNT.IS_NO_LABEL
      : DISCOUNT.IS_LABEL;

    nodes.push({
      id: labelName,
      type: 'treeMemo',
      position: {
        x: (index - (dataCount - discountNoLabel) / 2) * X_SPACING,
        y: Y_SPACING,
      },
      data: {
        labelName,
        memos,
      },
    });

    edges.push({
      id: `e-baseNode-${labelName}`,
      source: 'baseNode',
      target: labelName,
      type: isNoLabelMemo ? 'custom-edge-no-label' : 'custom-edge-label',
      sourceHandle: isNoLabelMemo ? 'baseRight' : 'baseBottom',
    });
  });

  return { nodes, edges };
};
