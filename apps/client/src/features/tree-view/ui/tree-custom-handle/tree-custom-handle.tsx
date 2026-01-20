import { LabelColorType } from '@shared/types/label-type';

import * as styles from './tree-custom-handle.css';

interface TreeCustomHandleProps {
  labelColor: LabelColorType;
  isBaseMemo?: boolean;
}

const TreeCustomHandle = ({
  labelColor,
  isBaseMemo = false,
}: TreeCustomHandleProps) => {
  return (
    <div
      className={isBaseMemo ? styles.baseHandle : styles.handle({ labelColor })}
    />
  );
};

export default TreeCustomHandle;
