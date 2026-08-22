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
  placeholder: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onEnter?: () => boolean;
}

const TagInputField = ({
  selectedTags,
  onRemoveTag,
  value,
  isOpen,
  placeholder,
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
        {selectedTags.map(({ tagId, name, color }) => (
          <Tag
            key={tagId}
            size="lg"
            color={color ?? ''}
            text={name ?? ''}
            action="remove"
            onRemove={() => onRemoveTag(tagId)}
          />
        ))}
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          placeholder={selectedTags.length ? '' : placeholder}
          onChange={handleChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInputField;
