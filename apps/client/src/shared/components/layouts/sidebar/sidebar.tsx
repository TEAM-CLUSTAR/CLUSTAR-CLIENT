import { useState } from 'react';
import { PATH } from '@router/path';
import { useLocation, useNavigate } from 'react-router';

import { Icon, IconName } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { buildTagTree } from '../../../utils/tag/build-tag-tree';
import { useSidebar } from './sidebar-context';
import SidebarItem from './sidebar-item/sidebar-item';
import SidebarTagItem from './sidebar-tag-item/sidebar-tag-item';
import { MOCK_TAG } from './tag-mock-data';

import * as styles from './sidebar.css';

const MENU_ITEMS: {
  id: string;
  iconName: IconName;
  text: string;
  path?: string;
}[] = [
  {
    id: 'search',
    iconName: 'ic_search',
    text: '검색',
  },
  {
    id: 'new-memo',
    iconName: 'ic_newmemo',
    text: '새메모',
    path: PATH.NEW_MEMO,
  },
  {
    id: 'all-memo',
    iconName: 'ic_allmemo',
    text: '전체메모',
    path: PATH.ROOT,
  },
  {
    id: 'structure',
    iconName: 'ic_treeview',
    text: '구조화뷰',
    path: PATH.STRUCTURE,
  },
];

/**
 * 현재 URL을 기준으로 선택된 사이드바 식별자
 */
const getSelectedIdFromUrl = (
  pathname: string,
  search: string,
): string | number | null => {
  const tag = new URLSearchParams(search).get('tag');
  if (tag) return Number(tag);

  if (pathname === PATH.ROOT) return PATH.ROOT;

  const menu = MENU_ITEMS.find((item) => item.path === pathname);
  return menu?.path ?? null;
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isExpanded, toggle, setExpanded } = useSidebar();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedId = getSelectedIdFromUrl(location.pathname, location.search);
  // @TODO: API 명세서 수정 이후 MOCK_TAG.tags 데이터를 API 데이터로 교체
  const tagTree = buildTagTree(MOCK_TAG.tags);

  const handleClickItem = (seletedId?: string) => {
    if (seletedId) navigate(seletedId);
    setExpanded(true);
  };

  return (
    <nav className={styles.sidebar} data-expanded={isExpanded}>
      {/* header */}
      <header className={styles.header}>
        <button
          className={styles.logoButton}
          onClick={toggle}
          disabled={isExpanded}
          aria-label="사이드바 토글"
        >
          <Icon name="ic_logo_symbol" size={32} className={styles.logoSymbol} />
          <Icon
            name="ic_logo_type"
            width={82}
            height={11}
            className={styles.logoType}
          />
        </button>
        <button
          className={styles.foldButton}
          onClick={toggle}
          aria-label="사이드바 접기"
        >
          <Icon name="ic_folding" size={32} color="grey600" />
        </button>
      </header>

      {/* 메뉴 */}
      <section className={styles.menuSection}>
        <span className={styles.sectionTitle}>메뉴</span>
        <ul className={styles.pannelList}>
          {MENU_ITEMS.map(({ id, iconName, text, path }) => (
            <li
              key={id}
              className={styles.pannelItem}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <SidebarItem
                iconName={iconName}
                content={text}
                isSelected={selectedId === path}
                onClick={() => handleClickItem(path)}
              />
              {!isExpanded && hoveredId === id && (
                <div className={styles.tooltip}>
                  <Tooltip title={text} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 태그: 펼침 = 트리 / 접힘 = 아이콘 1개 (트리는 비용이 커 접힘 시 렌더하지 않도록) */}
      <section className={styles.tagSection}>
        <span className={styles.sectionTitle}>태그</span>
        <hr className={styles.collapsedDivider} />
        {isExpanded ? (
          <ul>
            {tagTree.map((tag) => (
              <SidebarTagItem
                key={tag.tagId}
                tag={tag}
                selectedTagId={Number(selectedId)}
                onClick={(tagId) =>
                  handleClickItem(`${PATH.ROOT}?tag=${tagId}`)
                }
              />
            ))}
          </ul>
        ) : (
          <ul className={styles.pannelList}>
            <li
              className={styles.pannelItem}
              onMouseEnter={() => setHoveredId('태그')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <SidebarItem
                iconName="ic_tag"
                isSelected={typeof selectedId === 'number'}
                onClick={() => setExpanded(true)}
              />
              {!isExpanded && hoveredId === '태그' && (
                <div className={styles.tooltip}>
                  <Tooltip title="태그" />
                </div>
              )}
            </li>
          </ul>
        )}
      </section>

      {/* 마이페이지 */}
      <section className={styles.mypageSection}>
        <SidebarItem iconName="ic_profile" content="마이페이지" disabled />
      </section>
    </nav>
  );
};

export default Sidebar;
