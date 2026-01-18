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
  onItemClick?: (item: LabelItem) => void;
  labelSize?: 'sm' | 'lg';
}

const NO_LABEL_TEXT: LabelTextType = '라벨없음';

const LabelList = ({
  listType,
  dateText,
  labelItems,
  onItemClick,
  labelSize,
}: LabelListProps) => {
  const resolvedSize = labelSize ?? (listType === 'modal' ? 'lg' : 'sm');

  const displayItems: LabelItem[] =
    listType === 'card' && labelItems.length === 0
      ? [{ id: '라벨없음', text: NO_LABEL_TEXT }]
      : labelItems;

  const firstLabelText = displayItems[0]?.text;

  const hasLabel = displayItems.length > 0;

  const primaryColorValue = firstLabelText
    ? PRIMARY_COLOR_VALUE_BY_LABEL_COLOR[LABEL_COLOR_BY_TEXT[firstLabelText]]
    : PRIMARY_COLOR_VALUE_BY_LABEL_COLOR.grey;

  return (
    <div
      className={styles.labelListContainer({ listType })}
      style={{ [styles.PRIMARY_COLOR_VAR]: primaryColorValue } as CSSProperties}
    >
      {dateText && (
        <p className={styles.dateTextContainer}>{dateText} 생성됨</p>
      )}
      <div className={styles.labelContainer}>
        {listType === 'modal' && !hasLabel ? (
          <div className={styles.emptyLabel({ labelSize })} />
        ) : (
          <>
            {displayItems.map(({ id, text }) => (
              <Label
                key={id}
                labelSize={resolvedSize}
                labelColor={LABEL_COLOR_BY_TEXT[text]}
                labelText={text}
                onClick={
                  onItemClick ? () => onItemClick({ id, text }) : undefined
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LabelList;
