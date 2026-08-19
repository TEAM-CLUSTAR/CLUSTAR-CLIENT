import { Tooltip } from '@cds/ui';

import { useGetTag } from '@shared/apis/tag/queries';
import NavItem from '@shared/components/nav-item/nav-item';
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

/**
 * 태그 섹션: 펼침 = 트리 / 접힘 = 아이콘 1개
 * (트리는 렌더 비용이 커 접힘 시 렌더하지 않는다)
 */
const SidebarTagSection = ({
  isExpanded,
  selection,
  onSelectTag,
  onExpand,
}: SidebarTagSectionProps) => {
  const { data: tagTree = [] } = useGetTag();

  const selectedTagId = selection.type === 'tag' ? selection.tagId : null;

  return (
    <>
      {isExpanded ? (
        <div className={styles.tagSectionContainer}>
          <TreeLine>
            {tagTree.map((tag) => (
              <SidebarTagItem
                key={tag.tagId}
                tag={tag}
                selectedTagId={selectedTagId}
                onClick={onSelectTag}
              />
            ))}
          </TreeLine>
        </div>
      ) : (
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <NavItem
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
