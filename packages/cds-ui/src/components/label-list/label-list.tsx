import Label, { LabelColorType } from '../label/label';

import * as styles from './label-list.css';

type LabelListType = 'modal' | 'card';

export type LabelTextType = '졸업 프로젝트' | '교양' | 'SOPT' | '레퍼런스';

type ItemsType = {
  id: number;
  text: LabelTextType;
};

interface LabelListProps {
  listType: LabelListType;
  dateText?: string;
  labelItems: ItemsType[];
}

//@ TODO 실제 라벨-색상 매핑으로 교체
const LABEL_COLOR_BY_TEXT: Record<LabelTextType, LabelColorType> = {
  '졸업 프로젝트': 'blue',
  교양: 'green',
  SOPT: 'pink',
  레퍼런스: 'purple',
};

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
