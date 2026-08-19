import { useState } from 'react';

import { TagNode } from '@shared/apis/tag/type';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import TagTreeSelectItem from './tag-tree-select-item/tag-tree-select-item';

interface TagTreeSelectProps {
  tag: TreeNode<TagNode>;
  selectedIds: number[];
  onToggle: (tagId: number) => void;
}

const TagTreeSelect = ({ tag, selectedIds, onToggle }: TagTreeSelectProps) => {
  const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());

  const handleToggleExpand = (tagId: number) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  };

  return (
    <TreeLine>
      <TagTreeSelectItem
        tag={tag}
        selectedIds={new Set(selectedIds)}
        onToggle={onToggle}
        collapsedIds={collapsedIds}
        onToggleExpand={handleToggleExpand}
      />
    </TreeLine>
  );
};

export default TagTreeSelect;
