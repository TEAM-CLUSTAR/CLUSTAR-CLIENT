import { Icon } from '@cds/icon';

import * as styles from './tag.css';

export interface TagProps {
  size: 'sm' | 'lg';
  variant?: 'default' | 'ai';
  backgroundColor?: string;
  textColor?: string;
  text: string;
  onRemove?: () => void;
}

const Tag = ({
  size,
  variant = 'default',
  backgroundColor,
  textColor,
  text,
  onRemove,
}: TagProps) => {
  const isAi = variant === 'ai';

  return (
    <div
      className={styles.container({ size, removable: !!onRemove, ai: isAi })}
      style={isAi ? undefined : { backgroundColor, color: textColor }}
    >
      <div
        className={styles.indicator({ size, ai: isAi })}
        style={isAi ? undefined : { backgroundColor: textColor }}
        aria-hidden="true"
      />
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
