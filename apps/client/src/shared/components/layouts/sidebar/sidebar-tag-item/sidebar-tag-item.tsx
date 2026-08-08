import { TagType } from '@shared/apis/tag/type';
import { TreeNode } from '@shared/utils/build-tree';

import SidebarItem from '../sidebar-item/sidebar-item';

import * as styles from './sidebar-tag-item.css';

interface SidebarTagItemProps {
  tag: TreeNode<TagType>;
  selectedTagId: number | null;
  onClick: (tagId?: number) => void;
}

const SidebarTagItem = ({
  tag,
  selectedTagId,
  onClick,
}: SidebarTagItemProps) => {
  const hasChildren = tag.children.length > 0;

  return (
    <li className={styles.treeItem}>
      <SidebarItem
        iconName="ic_tag"
        content={tag.name}
        isSelected={selectedTagId === tag.tagId}
        onClick={() => onClick(tag.tagId)}
      />
      {hasChildren && (
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
