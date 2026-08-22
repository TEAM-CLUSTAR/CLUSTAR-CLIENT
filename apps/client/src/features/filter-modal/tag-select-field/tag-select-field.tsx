import { Tag } from '@cds/ui';

import { TagNode } from '@shared/apis/tag/type';

import * as styles from './tag-select-field.css';

interface TagSelectFieldProps {
  selectedTags: TagNode[];
  onRemoveTag: (tagId: number) => void;
}

const TagSelectField = ({ selectedTags, onRemoveTag }: TagSelectFieldProps) => {
  const hasTags = selectedTags.length > 0;

  return (
    <div className={styles.field({ isActive: hasTags })}>
      {hasTags ? (
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
        </div>
      ) : (
        <span className={styles.placeholder}>
          원하시는 태그를 선택해주세요.
        </span>
      )}
    </div>
  );
};

export default TagSelectField;
