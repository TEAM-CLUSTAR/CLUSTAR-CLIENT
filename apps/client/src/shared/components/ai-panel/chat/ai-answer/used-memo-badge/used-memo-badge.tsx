import * as styles from './used-memo-badge.css';

interface UsedMemoBadgeProps {
  count: number;
}

const UsedMemoBadge = ({ count }: UsedMemoBadgeProps) => {
  return (
    <span className={styles.container}>
      <span>사용된 메모</span>
      <span>+{count}</span>
    </span>
  );
};

export default UsedMemoBadge;
