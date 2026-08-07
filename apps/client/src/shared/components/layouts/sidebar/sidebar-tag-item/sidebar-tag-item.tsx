import TreeLine from '@shared/components/tree-line/tree-line';
import { TagTreeNodeType } from '@shared/types/tag';

import SidebarItem from '../sidebar-item/sidebar-item';

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
    <TreeLine.Item>
      <SidebarItem
        iconName="ic_tag"
        content={tag.name}
        isSelected={selectedTagId === tag.tagId}
        onClick={() => onClick(tag.tagId)}
      />
      {tag.children.length > 0 && (
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
