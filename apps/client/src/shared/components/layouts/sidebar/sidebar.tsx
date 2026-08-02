import { PATH } from '@router/path';
import { useLocation, useNavigate } from 'react-router';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { useSidebar } from './sidebar-context';
import SidebarItem from './sidebar-item/sidebar-item';
import SidebarMenuSection from './sidebar-menu-section/sidebar-menu-section';
import SidebarTagSection from './sidebar-tag-section/sidebar-tag-section';

import * as styles from './sidebar.css';

/**
 * 현재 URL을 기준으로 선택된 사이드바 식별자
 */
const getSelectedIdFromUrl = (
  pathname: string,
  search: string,
): string | number => {
  const tag = new URLSearchParams(search).get('tag');
  if (tag) return Number(tag);

  return pathname;
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isExpanded, toggle, setExpanded } = useSidebar();
  const selectedId = getSelectedIdFromUrl(location.pathname, location.search);

  const handleClickItem = (selectedId?: string) => {
    if (selectedId) navigate(selectedId);
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

      {/* 메뉴 section */}
      <section className={styles.menuSection}>
        <span className={styles.sectionTitle}>메뉴</span>
        <SidebarMenuSection
          selectedId={selectedId}
          onSelectMenu={handleClickItem}
        />
      </section>

      {/* 태그 section */}
      <section className={styles.tagSection}>
        <span className={styles.sectionTitle}>태그</span>
        <hr className={styles.collapsedDivider} />
        <SidebarTagSection
          selectedId={selectedId}
          onSelectTag={(tagId) => handleClickItem(`${PATH.ROOT}?tag=${tagId}`)}
        />
      </section>

      {/* footer section */}
      <section className={styles.footerSection}>
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <SidebarItem iconName="ic_profile" content="마이페이지" disabled />
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
