import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

import { EDGE_BORDER_RADIUS } from '@features/tree-view/model/constants';

const TreeCustomEdgeLabel = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    borderRadius: EDGE_BORDER_RADIUS,
  });

  return <BaseEdge id={id} path={edgePath} />;
};

export default TreeCustomEdgeLabel;
