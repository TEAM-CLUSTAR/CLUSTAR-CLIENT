import * as styles from './label.css';

type LabelSizeType = 'sm' | 'lg';
export type LabelColorType = 'blue' | 'purple' | 'green' | 'pink' | 'gray';

export interface LabelProps {
  labelSize: LabelSizeType;
  labelColor: LabelColorType;
  labelText: string;
}

const Label = ({ labelSize, labelColor, labelText }: LabelProps) => {
  const showIndicator = labelColor !== 'gray';

  return (
    <div className={styles.labelContainer({ labelSize, labelColor })}>
      {showIndicator && (
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
