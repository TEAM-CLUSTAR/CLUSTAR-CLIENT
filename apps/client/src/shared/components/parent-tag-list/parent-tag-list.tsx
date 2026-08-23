import { TagNode } from '@shared/apis/tag/type';
import MenuItem from '@shared/components/menu-item/menu-item';

import * as styles from './parent-tag-list.css';

interface ParentTagListProps {
  tags: TagNode[];
  selectedTagId: number;
  onSelect: (tagId: number) => void;
}

const ParentTagList = ({
  tags,
  selectedTagId,
  onSelect,
}: ParentTagListProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tags.map(({ tagId, name }) => (
          <li key={tagId}>
            <MenuItem
              type="sm"
              iconName="ic_tag"
              content={name}
              isSelected={selectedTagId === tagId}
              onClick={() => onSelect(tagId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentTagList;
