import { ChangeEvent, KeyboardEvent, useRef } from 'react';

import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { TagNode } from '@shared/apis/tag/type';

import * as styles from './tag-input-field.css';

interface TagInputFieldProps {
  selectedTags: TagNode[];
  onRemoveTag: (tagId: number) => void;
  value: string;
  isOpen: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onEnter?: () => boolean;
}

const TagInputField = ({
  selectedTags,
  onRemoveTag,
  value,
  isOpen,
  onChange,
  onFocus,
  onEnter,
}: TagInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    if (!onEnter?.()) return;

    inputRef.current?.blur();
  };

  return (
    <div className={styles.field({ isActive: isOpen })}>
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
          ref={inputRef}
          className={styles.input}
          value={value}
          placeholder={selectedTags.length ? '' : '태그 선택'}
          onChange={handleChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInputField;
