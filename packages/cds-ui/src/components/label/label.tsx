import { LabelColorType } from '../../constants/label-color-map';

import * as styles from './label.css';

type LabelSizeType = 'sm' | 'lg';

export interface LabelProps {
  labelSize: LabelSizeType;
  labelColor: LabelColorType;
  labelText: string;
  onClick?: () => void;
}

const Label = ({ labelSize, labelColor, labelText, onClick }: LabelProps) => {
  return (
    <div
      className={styles.labelContainer({
        labelSize,
        labelColor,
        clickable: !!onClick,
      })}
      onClick={onClick}
    >
      {labelColor && (
        <div
          className={styles.labelIndicator({ labelSize, labelColor })}
          aria-hidden="true"
        />
      )}
      <p>{labelText}</p>
    </div>
  );
};

export default Label;
