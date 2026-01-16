import FloatingLabelToken from '../floating-label-token/floating-label-token';

import * as styles from './floating-label.css';

// api에서 내려주는 라벨의 키값으로 변경 필요
interface LabelTypes {
  name: string;
  id: string | number;
}

interface FloatingLabelProps {
  labels: LabelTypes[];
}

const FloatingLabel = ({ labels }: FloatingLabelProps) => {
  return (
    <div className={styles.container}>
      {labels.map(({ name, id }) => (
        <FloatingLabelToken key={id}>{name}</FloatingLabelToken>
      ))}
    </div>
  );
};

export default FloatingLabel;
