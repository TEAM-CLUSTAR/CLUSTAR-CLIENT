import { TagNode } from '@shared/apis/tag/type';
import NavItem from '@shared/components/nav-item/nav-item';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

interface SidebarTagItemProps {
  tag: TreeNode<TagNode>;
  selectedTagId: number | null;
  onClick: (tagId: number) => void;
}

const SidebarTagItem = ({
  tag,
  selectedTagId,
  onClick,
}: SidebarTagItemProps) => {
  const hasChildren = tag.children.length > 0;

  return (
    <TreeLine.Item>
      <NavItem
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
