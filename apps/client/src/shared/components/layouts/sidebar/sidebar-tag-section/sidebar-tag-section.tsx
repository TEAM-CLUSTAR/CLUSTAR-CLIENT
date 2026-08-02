import { Tooltip } from '@cds/ui';

import { TagTreeNodeType } from '@shared/types/tag';
import { buildTree } from '@shared/utils/build-tree';

import { useSidebar } from '../sidebar-context';
import SidebarItem from '../sidebar-item/sidebar-item';
import SidebarTagItem from '../sidebar-tag-item/sidebar-tag-item';
import { MOCK_TAG } from '../tag-mock-data';

import * as styles from '../sidebar.css';

interface SidebarTagSectionProps {
  selectedId: string | number | null;
  onSelectTag: (tagId: number) => void;
}

/**
 * 태그 섹션: 펼침 = 트리 / 접힘 = 아이콘 1개
 * (트리는 렌더 비용이 커 접힘 시 렌더하지 않는다)
 */
const SidebarTagSection = ({
  selectedId,
  onSelectTag,
}: SidebarTagSectionProps) => {
  const { isExpanded, setExpanded } = useSidebar();
  // @TODO: API 명세서 수정 이후 MOCK_TAG.tags 데이터를 API 데이터로 교체
  const tagTree: TagTreeNodeType[] = buildTree(MOCK_TAG.tags, {
    getId: (tag) => tag.tagId,
    getParentId: (tag) => tag.parentId,
  });

  return (
    <>
      {isExpanded ? (
        <ul>
          {tagTree.map((tag) => (
            <SidebarTagItem
              key={tag.tagId}
              tag={tag}
              selectedTagId={Number(selectedId)}
              onClick={onSelectTag}
            />
          ))}
        </ul>
      ) : (
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <SidebarItem
              iconName="ic_tag"
              isSelected={typeof selectedId === 'number'}
              onClick={() => setExpanded(true)}
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
