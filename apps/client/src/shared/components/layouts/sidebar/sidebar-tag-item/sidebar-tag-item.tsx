import { TagType } from '@shared/apis/tag/type';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import SidebarItem from '../sidebar-item/sidebar-item';

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
    <TreeLine.Item>
      <SidebarItem
        iconName="ic_tag"
        content={tag.name}
        isSelected={selectedTagId === tag.tagId}
        onClick={() => onClick(tag.tagId)}
      />

      {hasChildren && (
        <TreeLine.Branch>
          {tag.children.map((child) => (
            <SidebarTagItem
              key={child.tagId}
              tag={child}
              selectedTagId={selectedTagId}
              onClick={onClick}
            />
          ))}
        </TreeLine.Branch>
      )}
    </TreeLine.Item>
  );
};

export default SidebarTagItem;
