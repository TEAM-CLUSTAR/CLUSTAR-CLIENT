import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
} from '../../constants/label-color-map';
import Label from '../label/label';

import * as styles from './label-list.css';

type LabelListType = 'modal' | 'card';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface LabelListProps {
  listType: LabelListType;
  dateText?: string;
  labelItems: LabelItem[];
}
//@ TODO 실제 라벨-색상 매핑으로 교체

const LabelList = ({ listType, dateText, labelItems }: LabelListProps) => {
  const labelSize = listType === 'modal' ? 'lg' : 'sm';

  return (
    <div className={styles.labelListContainer({ listType })}>
      {dateText && <p className={styles.dateTextContainer}>{dateText}</p>}
      <div className={styles.labelContainer}>
        {labelItems.map(({ id, text }) => (
          <Label
            key={id}
            labelSize={labelSize}
            labelColor={LABEL_COLOR_BY_TEXT[text]}
            labelText={text}
          />
        ))}
      </div>
    </div>
  );
};

export default LabelList;
