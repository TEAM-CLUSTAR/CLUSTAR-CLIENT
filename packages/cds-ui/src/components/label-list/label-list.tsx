import { CSSProperties } from 'react';

import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
  PRIMARY_COLOR_VALUE_BY_LABEL_COLOR,
} from '../../constants/label-color-map';
import Label from '../label/label';

import * as styles from './label-list.css';

type LabelListType = 'modal' | 'card';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

export interface LabelListProps {
  listType: LabelListType;
  dateText?: string;
  labelItems: LabelItem[];
}

const LabelList = ({ listType, dateText, labelItems }: LabelListProps) => {
  const primaryLabelColor = labelItems[0]
    ? LABEL_COLOR_BY_TEXT[labelItems[0].text]
    : 'gray';
  const primaryColorValue =
    PRIMARY_COLOR_VALUE_BY_LABEL_COLOR[primaryLabelColor];
  const labelSize = listType === 'modal' ? 'lg' : 'sm';

  return (
    <div
      className={styles.labelListContainer({ listType })}
      style={{ [styles.PRIMARY_COLOR_VAR]: primaryColorValue } as CSSProperties}
    >
      {dateText && <p className={styles.dateTextContainer}>{dateText} 생성됨</p>}
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
