/**
 * @deprecated 삭제 예정 파일
 */
// NOTE: 삭제 예정이지만 Tag 도입 밑작업에서 props 타입이 함께 변경되어
// 타입 에러 방지를 위해 최소 범위만 수정
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
