import { useState } from 'react';

import { Tooltip } from '@cds/ui';

import { useGetTag } from '@shared/apis/tag/queries';
import Accordion from '@shared/components/accordion/accordion';
import MenuItem from '@shared/components/menu-item/menu-item';
import TreeLine from '@shared/components/tree-line/tree-line';

import SidebarTagItem from '../sidebar-tag-item/sidebar-tag-item';
import { SidebarSelection } from '../type';

import * as styles from '../sidebar.css';

interface SidebarTagSectionProps {
  isExpanded: boolean;
  selection: SidebarSelection;
  onSelectTag: (tagId: number) => void;
  onExpand: () => void;
}

const SidebarTagSection = ({
  isExpanded,
  selection,
  onSelectTag,
  onExpand,
}: SidebarTagSectionProps) => {
  const { data: tagTree = [] } = useGetTag();
  const [openTagIds, setOpenTagIds] = useState<Set<number>>(() => new Set());

  const selectedTagId = selection.type === 'tag' ? selection.tagId : null;

  const changeTagOpen = (tagId: number, isOpen: boolean) => {
    setOpenTagIds((previousOpenTagIds) => {
      const nextOpenTagIds = new Set(previousOpenTagIds);

      if (isOpen) {
        nextOpenTagIds.add(tagId);
      } else {
        nextOpenTagIds.delete(tagId);
      }

      return nextOpenTagIds;
    });
  };

  return (
    <>
      {isExpanded ? (
        <Accordion className={styles.tagSectionContainer}>
          <TreeLine>
            {tagTree.map((tag) => (
              <SidebarTagItem
                key={tag.tagId}
                tag={tag}
                selectedTagId={selectedTagId}
                openTagIds={openTagIds}
                onOpenChange={changeTagOpen}
                onClick={onSelectTag}
              />
            ))}
          </TreeLine>
        </Accordion>
      ) : (
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <MenuItem
              iconName="ic_tag"
              isSelected={selection.type === 'tag'}
              onClick={onExpand}
            />
            <div className={styles.tooltip}>
              <Tooltip title="태그" />
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default SidebarTagSection;
