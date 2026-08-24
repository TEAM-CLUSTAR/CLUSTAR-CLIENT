import { KeyboardEvent } from 'react';

import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { TagNode } from '@shared/apis/tag/type';

import * as styles from './tag-input-field.css';

interface TagInputFieldProps {
  selectedTags: TagNode[];
  onRemoveTag: (tagId: number) => void;
  isOpen: boolean;
  onFocus: () => void;
  onEnter?: (value: string) => boolean;
}

const TagInputField = ({
  selectedTags,
  onRemoveTag,
  isOpen,
  onFocus,
  onEnter,
}: TagInputFieldProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;

    const isTagAdded = onEnter?.(event.currentTarget.value);
    if (!isTagAdded) return;

    event.currentTarget.value = '';
    event.currentTarget.blur();
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
          className={styles.input}
          placeholder={selectedTags.length === 0 ? '태그 선택' : ''}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInputField;
