import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import { Tooltip } from '@cds/ui';

import { useGetTag } from '@shared/apis/tag/queries';
import TreeLine from '@shared/components/tree-line/tree-line';

import SidebarItem from '../sidebar-item/sidebar-item';
import SidebarTagItem from '../sidebar-tag-item/sidebar-tag-item';

import * as styles from '../sidebar.css';

interface SidebarTagSectionProps {
  isExpanded: boolean;
  selectedTagId: string;
  isTagSelected: boolean;
  onExpand: () => void;
}

/**
 * 태그 섹션: 펼침 = 트리 / 접힘 = 아이콘 1개
 * (트리는 렌더 비용이 커 접힘 시 렌더하지 않는다)
 */
const SidebarTagSection = ({
  isExpanded,
  selectedTagId,
  isTagSelected,
  onExpand,
}: SidebarTagSectionProps) => {
  const navigate = useNavigate();

  const { data: tagTree = [] } = useGetTag();

  const handleSelectTag = (tagId?: number) => {
    if (tagId === undefined) return;
    navigate(`${PATH.ROOT}?tag=${tagId}`);
  };

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
                onClick={handleSelectTag}
              />
            ))}
          </TreeLine>
        </div>
      ) : (
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <SidebarItem
              iconName="ic_tag"
              isSelected={isTagSelected}
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
