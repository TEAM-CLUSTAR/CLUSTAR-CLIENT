import { BaseEdge, EdgeProps } from '@xyflow/react';

export const TreeCustomEdgeNoLabel = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) => {
  const radius = 30;

  const path = `
  M ${sourceX},${sourceY}
  L ${targetX - radius},${sourceY}
  Q ${targetX},${sourceY} ${targetX},${sourceY + radius}
  L ${targetX},${targetY}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return <BaseEdge id={id} path={path} />;
};

export default TreeCustomEdgeNoLabel;
