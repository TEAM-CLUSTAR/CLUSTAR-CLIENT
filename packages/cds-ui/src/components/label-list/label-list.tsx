import Label, { LabelColorType } from '../label/label';

import * as styles from './label-list.css';

type LabelListDensityType = 'dense' | 'regular';

type ItemsType = {
  id: number;
  text: string;
  color: LabelColorType;
};

interface LabelListProps {
  type: LabelListDensityType;
  dateText?: string;
  items: ItemsType[];
}

const LabelList = ({ type, dateText, items }: LabelListProps) => {
  const labelSize = type === 'dense' ? 'lg' : 'sm';

  return (
    <div className={styles.labelListContainer({ type })}>
      {dateText && <p className={styles.dateTextContainer}>{dateText}</p>}
      <div className={styles.labelContainer}>
        {items.map(({ id, text, color }) => (
          <Label
            key={id}
            labelSize={labelSize}
            labelColor={color}
            labelText={text}
          />
        ))}
      </div>
    </div>
  );
};

export default LabelList;
