import { BaseEdge, EdgeProps } from '@xyflow/react';
const BORDER_RADIUS = 30;

const CustomEdge = ({ sourceX, sourceY, targetX, targetY }: EdgeProps) => {
  const path = `
  M ${sourceX},${sourceY}
  L ${targetX - BORDER_RADIUS},${sourceY}
  Q ${targetX},${sourceY} ${targetX},${sourceY + BORDER_RADIUS}
  L ${targetX},${targetY}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return <BaseEdge path={path} />;
};

export default CustomEdge;
