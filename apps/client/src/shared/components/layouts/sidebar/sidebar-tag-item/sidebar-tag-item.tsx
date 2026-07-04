// sidebar/sidebar-tag-item/sidebar-tag-item.tsx
import { TagTreeNodeType } from '@shared/types/tag';

import SidebarItem from '../sidebar-item/sidebar-item';

import * as styles from './sidebar-tag-item.css';

interface SidebarTagItemProps {
  tag: TagTreeNodeType;
  selectedTagId: number | null;
  onClick: (tagId: number) => void;
}

const SidebarTagItem = ({
  tag,
  selectedTagId,
  onClick,
}: SidebarTagItemProps) => {
  return (
    <li className={styles.treeItem}>
      <SidebarItem
        iconName="ic_tag"
        content={tag.name}
        isSelected={selectedTagId === tag.tagId}
        onClick={() => onClick(tag.tagId)}
      />
      {tag.children.length > 0 && (
        <ul className={styles.treeChildren}>
          {tag.children.map((child) => (
            <SidebarTagItem
              key={child.tagId}
              tag={child}
              selectedTagId={selectedTagId}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarTagItem;
