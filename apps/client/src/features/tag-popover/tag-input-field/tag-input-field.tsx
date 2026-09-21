import { KeyboardEvent, useEffect, useId, useRef } from 'react';

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
  value = '',
  onChange,
}: TagInputFieldProps) => {
  const inputId = useId();
  const tagListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tagList = tagListRef.current;
    if (tagList) tagList.scrollLeft = isOpen ? tagList.scrollWidth : 0;
  }, [isOpen, value]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '/') {
      const slashCount = event.currentTarget.value.split('/').length - 1;
      if (slashCount >= MAX_TAG_DEPTH - 1) {
        event.preventDefault();
      }
      return;
    }

    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;

    if (!onEnter?.(event.currentTarget.value)) return;

    onChange('');
    event.currentTarget.blur();
  };

  return (
    <label className={styles.field({ isActive: isOpen })} htmlFor={inputId}>
      <Icon name="ic_tag" size={32} color={isOpen ? 'blue500' : 'grey600'} />
      <div ref={tagListRef} className={styles.tagList}>
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
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onChange('')}
        />
      </div>
    </label>
  );
};

export default TagInputField;
