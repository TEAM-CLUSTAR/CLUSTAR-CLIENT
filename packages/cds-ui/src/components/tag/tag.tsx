import { Icon } from '@cds/icon';

import { TAG_COLOR_MATCH, TagColorType } from '../../constants/tag-color-match';

import * as styles from './tag.css';

export interface TagProps {
  size: 'sm' | 'lg';
  color: string;
  text: string;
  action?: 'default' | 'remove';
  onRemove?: () => void;
}

const Tag = ({ size, color, text, action = 'default', onRemove }: TagProps) => {
  const isAi = color === 'ai';
  const colorStyle =
    color && !isAi ? TAG_COLOR_MATCH[color as TagColorType] : undefined;
  const removable = action === 'remove';

  return (
    <div
      className={styles.container({ size, removable, ai: isAi })}
      style={{
        backgroundColor: colorStyle?.backgroundColor,
        color: colorStyle?.textColor,
      }}
    >
      <div
        className={styles.indicator({ size, ai: isAi })}
        style={{ backgroundColor: colorStyle?.textColor }}
        aria-hidden="true"
      />
      <p>{text}</p>
      {removable && onRemove && (
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
