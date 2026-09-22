import { TagNode } from '@shared/apis/tag/type';
import Accordion from '@shared/components/accordion/accordion';
import MenuItem from '@shared/components/menu-item/menu-item';
import TreeLine from '@shared/components/tree-line/tree-line';
import { TreeNode } from '@shared/utils/build-tree';

import * as styles from '../sidebar.css';

interface SidebarTagItemProps {
  tag: TreeNode<TagNode>;
  selectedTagId: number | null;
  openTagIds: ReadonlySet<number>;
  onOpenChange: (tagId: number, isOpen: boolean) => void;
  onClick: (tagId: number) => void;
}

const SidebarTagItem = ({
  tag,
  selectedTagId,
  openTagIds,
  onOpenChange,
  onClick,
}: SidebarTagItemProps) => {
  const hasChildren = tag.children.length > 0;
  const isOpen = openTagIds.has(tag.tagId);

  const selectTag = () => {
    onClick(tag.tagId);
  };

  if (!hasChildren) {
    return (
      <TreeLine.Item>
        <MenuItem
          iconName="ic_tag"
          content={tag.name}
          isSelected={selectedTagId === tag.tagId}
          onClick={selectTag}
        />
      </TreeLine.Item>
    );
  }

  return (
    <TreeLine.Item>
      <Accordion.Item
        className={styles.tagAccordionItem}
        isOpen={isOpen}
        onOpenChange={(nextIsOpen) => onOpenChange(tag.tagId, nextIsOpen)}
      >
        <Accordion.Trigger onClick={selectTag}>
          {(triggerProps) => (
            <MenuItem
              {...triggerProps}
              iconName="ic_tag"
              content={tag.name}
              isSelected={selectedTagId === tag.tagId}
            />
          )}
        </Accordion.Trigger>
        <Accordion.Content className={styles.tagBranchContainer}>
          <div className={styles.tagBranchInner}>
            <TreeLine.Branch>
              {tag.children.map((child) => (
                <SidebarTagItem
                  key={child.tagId}
                  tag={child}
                  selectedTagId={selectedTagId}
                  openTagIds={openTagIds}
                  onOpenChange={onOpenChange}
                  onClick={onClick}
                />
              ))}
            </TreeLine.Branch>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </TreeLine.Item>
  );
};

export default SidebarTagItem;
