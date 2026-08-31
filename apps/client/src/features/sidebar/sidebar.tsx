import { useState } from 'react';
import { useAiPanel } from '@features/ai-panel';
import { PATH } from '@router/path';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import MenuItem from '@shared/components/menu-item/menu-item';
import { DESKTOP_MEDIA_QUERY } from '@shared/constants/media-query';
import { useMediaQuery } from '@shared/hooks/use-media-query';

import { useSidebar } from './sidebar-context';
import SidebarMenuSection from './sidebar-menu-section/sidebar-menu-section';
import SidebarTagSection from './sidebar-tag-section/sidebar-tag-section';
import { SidebarSelection } from './type';

import * as styles from './sidebar.css';

const Sidebar = () => {
  const { isExpanded, toggleSidebar, expand } = useSidebar();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { isOpen } = useAiPanel();
  const isNarrowLayout = useMediaQuery(`(max-width: ${DESKTOP_MEDIA_QUERY})`);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tagParam = searchParams.get('tag');

  const isSidebarCollapse = isNarrowLayout && isOpen;
  const isSidebarExpanded = isExpanded && !isSidebarCollapse;

  // 태그 선택은 `/memos?tag=`로 이동해 pathname이 모든 메모와 같아지므로,
  // 태그가 경로보다 우선한다는 규칙을 여기 한 곳에서만 정한다.
  const selection: SidebarSelection =
    tagParam === null
      ? { type: 'menu', path: pathname }
      : { type: 'tag', tagId: Number(tagParam) };

  const handleSelectMenu = (path: string) => {
    navigate(path);
    expand();
  };

  const handleSelectSearch = () => {
    expand();
    setIsSearchModalOpen(true);
  };

  const handleSelectTag = (tagId: number) => {
    navigate(`${PATH.MEMOS}?tag=${tagId}`);
  };

  return (
    <nav className={styles.sidebar} data-expanded={isSidebarExpanded}>
      {/* header */}
      <header className={styles.header}>
        <button
          className={styles.logoButton}
          onClick={toggleSidebar}
          disabled={isSidebarCollapse}
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
          onClick={toggleSidebar}
          aria-label="사이드바 접기"
        >
          <Icon name="ic_folding" size={32} color="grey600" />
        </button>
      </header>

      {/* 메뉴 section */}
      <section className={styles.menuSection}>
        <span className={styles.sectionTitle}>메뉴</span>
        <SidebarMenuSection
          selection={selection}
          onSelectMenu={handleSelectMenu}
          onExpand={expand}
          onClickSearch={handleSelectSearch}
          setIsSearchModalOpen={setIsSearchModalOpen}
          isSearchMoalOpen={isSearchModalOpen}
        />
      </section>

      {/* 태그 section */}
      <section className={styles.tagSection}>
        <span className={styles.sectionTitle}>태그</span>
        <hr className={styles.collapsedDivider} />
        <SidebarTagSection
          isExpanded={isSidebarExpanded}
          selection={selection}
          onSelectTag={handleSelectTag}
          onExpand={expand}
        />
      </section>

      {/* footer section */}
      <section className={styles.footerSection}>
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <MenuItem iconName="ic_profile" content="마이페이지" disabled />
            <div className={styles.tooltip}>
              <Tooltip title="마이페이지" />
            </div>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Sidebar;
