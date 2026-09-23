import { ChangeEvent, KeyboardEvent, useEffect, useId, useRef } from 'react';

import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { TagNode } from '@shared/apis/tag/type';

import * as styles from './tag-input-field.css';

const MAX_TAG_DEPTH = 3;
const MAX_TAG_NAME_LENGTH = 10;

export interface TagInputFieldProps {
  selectedTags: TagNode[];
  onRemoveTag: (tagId: number) => void;
  isOpen: boolean;
  onFocus: () => void;
  onEnter?: (value: string) => boolean;
  value?: string;
  onChange: (value: string) => void;
}

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
  }, [isOpen, value, selectedTags.length]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const names = target.value.split('/');

    if (names.every((name) => name.length <= MAX_TAG_NAME_LENGTH)) {
      onChange(target.value);
    }
  };

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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => onChange('')}
        />
      </div>
    </label>
  );
};

export default TagInputField;
