import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

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
    borderRadius: 30,
  });

  return <BaseEdge id={id} path={edgePath} />;
};

export default TreeCustomEdgeLabel;
