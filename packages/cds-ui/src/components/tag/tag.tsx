import { Icon } from '@cds/icon';

import { TAG_COLOR_MATCH, TagColorType } from '../../constants/tag-color-match';

import * as styles from './tag.css';

type TagBaseProps = {
  text: string;
};

type NoneActionProps = {
  action?: 'none';
  onRemove?: never;
};

type RemoveActionProps = {
  action: 'remove';
  onRemove: () => void;
};

type SmallFillTagProps = NoneActionProps & {
  size: 'sm';
  variant?: 'fill';
  color: string;
};

type LargeFillTagProps = {
  size: 'lg';
  variant?: 'fill';
  color: string;
} & (NoneActionProps | RemoveActionProps);

type OutlinedTagProps = NoneActionProps & {
  size: 'sm' | 'lg';
  variant: 'outlined';
  color?: never;
};

type TagProps = TagBaseProps &
  (SmallFillTagProps | LargeFillTagProps | OutlinedTagProps);

const Tag = ({ size, text, ...rest }: TagProps) => {
  const isOutlined = rest.variant === 'outlined';
  const colorStyle =
    !isOutlined && rest.color
      ? TAG_COLOR_MATCH[rest.color as TagColorType]
      : undefined;

  return (
    <div
      className={styles.container({
        size,
        removable: rest.action === 'remove',
        outlined: isOutlined,
      })}
      style={{
        backgroundColor: colorStyle?.backgroundColor,
        color: colorStyle?.textColor,
      }}
    >
      <div
        className={styles.indicator({ size, outlined: isOutlined })}
        style={{ backgroundColor: colorStyle?.textColor }}
        aria-hidden="true"
      />
      <p>{text}</p>
      {rest.onRemove && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            rest.onRemove?.();
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
