import { Icon } from '@cds/icon';

import * as styles from './tag.css';

export interface TagProps {
  size: 'sm' | 'lg';
  color: string;
  text: string;
  onRemove?: () => void;
}

const Tag = ({ size, color, text, onRemove }: TagProps) => {
  return (
    <div
      className={styles.container({ size })}
      style={{ backgroundColor: color }}
    >
      <div className={styles.indicator({ size })} aria-hidden="true" />
      <p>{text}</p>
      {onRemove && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          aria-label="태그 삭제"
        >
          <Icon name="ic_delete" size={20} color="grey500" />
        </button>
      )}
    </div>
  );
};

export default Tag;
