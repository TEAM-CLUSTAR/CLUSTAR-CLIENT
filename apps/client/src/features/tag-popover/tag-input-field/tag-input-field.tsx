import { ChangeEvent, KeyboardEvent, useId } from 'react';

import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { TagInputFieldProps } from '../type';

import * as styles from './tag-input-field.css';

const MAX_TAG_DEPTH = 3;

const TagInputField = ({
  selectedTags,
  onRemoveTag,
  isOpen,
  onFocus,
  onEnter,
  value,
  onChange,
}: TagInputFieldProps) => {
  const inputId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '/') {
      const slashCount = (event.currentTarget.value.match(/\//g) ?? []).length;
      if (slashCount >= MAX_TAG_DEPTH - 1) {
        event.preventDefault();
      }
      return;
    }

    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;

    const isTagAdded = onEnter?.(event.currentTarget.value);
    if (!isTagAdded) return;

    onChange('');
    event.currentTarget.blur();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className={styles.field({ isActive: isOpen })} htmlFor={inputId}>
      <Icon name="ic_tag" size={32} color={isOpen ? 'blue500' : 'grey600'} />
      <div className={styles.tagList}>
        {selectedTags.map(({ tagId, name, color }) =>
          isOpen ? (
            <Tag
              key={tagId}
              size="lg"
              color={color}
              text={name}
              action="remove"
              onRemove={() => onRemoveTag(tagId)}
            />
          ) : (
            <Tag key={tagId} size="lg" color={color} text={name} />
          ),
        )}
        <input
          id={inputId}
          className={styles.input}
          placeholder={selectedTags.length === 0 ? '태그 선택' : ''}
          value={value}
          onFocus={onFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => onChange('')}
        />
      </div>
    </label>
  );
};

export default TagInputField;
