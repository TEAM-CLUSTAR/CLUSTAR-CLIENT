import {
  TAG_COLOR_BY_TEXT,
  TagColorType,
  TagTextType,
} from '../../constants/tag-type';

import * as styles from './tag.css';

export type TagSizeType = 'sm' | 'lg';

export interface TagProps {
  size: TagSizeType;
  color: TagColorType;
  text: string;
  onClick?: () => void;
}

const Tag = ({ size, color, text, onClick }: TagProps) => {
  const tagColor =
    TAG_COLOR_BY_TEXT[text as TagTextType] ?? (color as TagColorType);

  return (
    <div
      className={styles.container({
        size,
        color: tagColor,
        clickable: !!onClick,
      })}
      onClick={onClick}
    >
      <div
        className={styles.indicator({ size, color: tagColor })}
        aria-hidden="true"
      />
      <p>{text}</p>
    </div>
  );
};

export default Tag;
