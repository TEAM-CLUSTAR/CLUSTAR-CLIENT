import { Icon } from '@cds/icon';

import { getTagColor } from '../../constants/tag-color-match';

import * as styles from './tag.css';

export interface TagProps {
  text: string;
  color?: string;
  size?: 'sm' | 'md';
  onRemove?: () => void;
}

const Tag = ({ text, color = 'grey', size = 'sm', onRemove }: TagProps) => {
  const { backgroundColor, textColor, borderColor } = getTagColor(color);

  return (
    <div
      className={styles.container({ size, removable: !!onRemove })}
      style={{ backgroundColor, color: textColor, outlineColor: borderColor }}
    >
      <p className={styles.text}>{text}</p>
      {onRemove && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          aria-label="태그 삭제"
        >
          <Icon
            name="ic_remove"
            className={styles.removeIcon({ size })}
            style={{ color: 'inherit' }}
          />
        </button>
      )}
    </div>
  );
};

export default Tag;
