import { TagNode } from '@shared/apis/tag/type';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import TagTreeSelectItem from './tag-tree-select-item/tag-tree-select-item';

interface TagTreeSelectProps {
  tags: TreeNode<TagNode>[];
  selectedIds: number[];
  onToggle: (tagId: number) => void;
  collapsedIds: number[];
  onToggleExpand: (tagId: number) => void;
}

const TagTreeSelect = ({
  tags,
  selectedIds,
  onToggle,
  collapsedIds,
  onToggleExpand,
}: TagTreeSelectProps) => {
  return (
    <TreeLine>
      {tags.map((tag) => (
        <TagTreeSelectItem
          key={tag.tagId}
          tag={tag}
          selectedIds={selectedIds}
          onToggle={onToggle}
          collapsedIds={collapsedIds}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </TreeLine>
  );
};

export default TagTreeSelect;
