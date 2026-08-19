import { PATH } from '@router/path';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import NavItem from '@shared/components/nav-item/nav-item';

import { useSidebar } from './sidebar-context';
import SidebarMenuSection from './sidebar-menu-section/sidebar-menu-section';
import SidebarTagSection from './sidebar-tag-section/sidebar-tag-section';
import { SidebarSelection } from './type';

import * as styles from './sidebar.css';

const Sidebar = () => {
  const { isExpanded, toggleSidebar, expand } = useSidebar();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tagParam = searchParams.get('tag');

  // 태그 선택은 `/?tag=`로 이동해 pathname이 ROOT와 같아지므로,
  // 태그가 경로보다 우선한다는 규칙을 여기 한 곳에서만 정한다.
  const selection: SidebarSelection =
    tagParam === null
      ? { type: 'menu', path: pathname }
      : { type: 'tag', tagId: Number(tagParam) };

  const handleSelectMenu = (path: string) => {
    navigate(path);
    expand();
  };

  const handleSelectTag = (tagId: number) => {
    navigate(`${PATH.ROOT}?tag=${tagId}`);
  };

  return (
    <nav className={styles.sidebar} data-expanded={isExpanded}>
      {/* header */}
      <header className={styles.header}>
        <button
          className={styles.logoButton}
          onClick={toggleSidebar}
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
        />
      </section>

      {/* 태그 section */}
      <section className={styles.tagSection}>
        <span className={styles.sectionTitle}>태그</span>
        <hr className={styles.collapsedDivider} />
        <SidebarTagSection
          isExpanded={isExpanded}
          selection={selection}
          onSelectTag={handleSelectTag}
          onExpand={expand}
        />
      </section>

      {/* footer section */}
      <section className={styles.footerSection}>
        <ul className={styles.pannelList}>
          <li className={styles.pannelItem}>
            <NavItem iconName="ic_profile" content="마이페이지" disabled />
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
