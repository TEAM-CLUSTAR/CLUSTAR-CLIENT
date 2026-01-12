import Label, { LabelColorType } from '../label/label';

import * as styles from './label-list.css';

type LabelListDensityType = 'dense' | 'regular';
export type LabelTextType =
  | 'SOPT'
  | '학교'
  | '책'
  | '졸업프로젝트'
  | '태그없음'; //@TODO 실제 라벨 지정

type ItemsType = {
  id: number;
  text: LabelTextType;
};

interface LabelListProps {
  type: LabelListDensityType;
  dateText?: string;
  items: ItemsType[];
}

//@ TODO 실제 라벨-색상 매핑으로 교체
const LABEL_COLOR_BY_TEXT: Record<LabelTextType, LabelColorType> = {
  SOPT: 'blue',
  학교: 'green',
  책: 'purple',
  졸업프로젝트: 'pink',
  태그없음: 'gray',
};

const LabelList = ({ type, dateText, items }: LabelListProps) => {
  const labelSize = type === 'dense' ? 'lg' : 'sm';

  return (
    <div className={styles.labelListContainer({ type })}>
      {dateText && <p className={styles.dateTextContainer}>{dateText}</p>}
      <div className={styles.labelContainer}>
        {items.map(({ id, text }) => (
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
