import { Icon } from '@cds/icon';

import { TagColorType } from '../../constants/tag-type';

import * as styles from './tag.css';

type TagSizeType = 'sm' | 'lg';

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
          className={styles.removeButton}
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
