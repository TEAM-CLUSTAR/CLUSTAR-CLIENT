import TooltipTag from '../tooltip-tag/tooltip-tag';

import * as styles from './tooltip.css';

// api에서 내려주는 라벨의 키값으로 변경 필요
interface LabelTypes {
  name: string;
  id: string | number;
}

interface TooltipProps {
  labels: LabelTypes[];
}

const Tooltip = ({ labels }: TooltipProps) => {
  return (
    <div className={styles.container}>
      {labels.map(({ name, id }) => (
        <TooltipTag key={id}>{name}</TooltipTag>
      ))}
    </div>
  );
};

export default Tooltip;
