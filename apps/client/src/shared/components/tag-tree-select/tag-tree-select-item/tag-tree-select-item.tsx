import { Icon } from '@cds/icon';

import { TagNode } from '@shared/apis/tag/type';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import * as styles from './tag-tree-select-item.css';

interface TagTreeSelectItemProps {
  tag: TreeNode<TagNode>;
  selectedIds: number[];
  onToggle: (tagId: number) => void;
  collapsedIds: number[];
  onToggleExpand: (tagId: number) => void;
}

const TagTreeSelectItem = ({
  tag,
  selectedIds,
  onToggle,
  collapsedIds,
  onToggleExpand,
}: TagTreeSelectItemProps) => {
  const isRoot = tag.parentId == null;
  const hasChildren = tag.children.length > 0;
  const isExpanded = !collapsedIds.includes(tag.tagId);
  const isChecked = selectedIds.includes(tag.tagId);

  const handleExpandClick = () => {
    onToggleExpand(tag.tagId);
  };

  const handleToggleClick = () => {
    onToggle(tag.tagId);
  };

  return (
    <TreeLine.Item>
      <div className={styles.row({ isRoot })}>
        {hasChildren && (
          <button
            type="button"
            className={styles.expandButton({ isExpanded })}
            onClick={handleExpandClick}
            aria-label={isExpanded ? '하위 태그 접기' : '하위 태그 펼치기'}
          >
            <Icon
              name={isExpanded ? 'ic_chevron_down' : 'ic_chevron_right'}
              size={20}
              color={isExpanded ? 'grey600' : 'grey500'}
            />
          </button>
        )}

        <button
          type="button"
          className={styles.content}
          onClick={handleToggleClick}
          aria-pressed={isChecked}
        >
          <Icon
            name={isChecked ? 'ic_checkbox_on' : 'ic_checkbox_off'}
            size={24}
            color="grey400"
            className={styles.checkboxBox}
          />
          <span className={styles.tagName}>{tag.name}</span>
        </button>
      </div>

      {hasChildren && (
        <div className={styles.branchContainer({ isExpanded })}>
          <div className={styles.branchInner}>
            <TreeLine.Branch>
              {tag.children.map((child) => (
                <TagTreeSelectItem
                  key={child.tagId}
                  tag={child}
                  selectedIds={selectedIds}
                  onToggle={onToggle}
                  collapsedIds={collapsedIds}
                  onToggleExpand={onToggleExpand}
                />
              ))}
            </TreeLine.Branch>
          </div>
        </div>
      )}
    </TreeLine.Item>
  );
};

export default TagTreeSelectItem;
