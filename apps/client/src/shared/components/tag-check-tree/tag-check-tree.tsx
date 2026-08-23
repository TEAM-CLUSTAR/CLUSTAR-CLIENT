import { useState } from 'react';

import { TagNode } from '@shared/apis/tag/type';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import TagCheckTreeItem from './tag-check-tree-item/tag-check-tree-item';

interface TagCheckTreeProps {
  tag: TreeNode<TagNode>;
  selectedIds: number[];
  onToggle: (tagId: number) => void;
}

const TagCheckTree = ({ tag, selectedIds, onToggle }: TagCheckTreeProps) => {
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
      <TagCheckTreeItem
        tag={tag}
        selectedIds={new Set(selectedIds)}
        onToggle={onToggle}
        collapsedIds={collapsedIds}
        onToggleExpand={handleToggleExpand}
      />
    </TreeLine>
  );
};

export default TagCheckTree;
