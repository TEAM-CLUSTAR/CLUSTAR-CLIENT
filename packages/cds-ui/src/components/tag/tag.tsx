import { Icon } from '@cds/icon';

import * as styles from './tag.css';

type TagSizeType = 'sm' | 'lg';

type TagColorType =
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'lightBlue'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'gradient'
  | 'grey';

export interface TagProps {
  size: TagSizeType;
  color: TagColorType;
  text: string;
  onRemove?: () => void;
}

const Tag = ({ size, color, text, onRemove }: TagProps) => {
  return (
    <div
      className={styles.container({
        size,
        color,
      })}
    >
      <div className={styles.indicator({ size, color })} aria-hidden="true" />
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
