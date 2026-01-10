import * as styles from './label.css';

type labelSizeType = 'sm' | 'lg';
type labelColorType = 'blue' | 'purple' | 'green' | 'pink' | 'gray';

export interface LabelProps {
  labelSize: labelSizeType;
  labelColor: labelColorType;
  labelText: string;
}

const Label = ({ labelSize, labelColor, labelText }: LabelProps) => {
  const showIndicator = labelColor !== 'gray';

  return (
    <label className={styles.labelContainer({ labelSize, labelColor })}>
      {showIndicator && (
        <div
          className={styles.labelIndicator({ labelSize, labelColor })}
          aria-hidden="true"
        />
      )}
      <p>{labelText}</p>
    </label>
  );
};

export default Label;
