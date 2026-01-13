import { ComponentProps, useState } from 'react';

import { Icon } from '@cds/icon';

import {
  FloatingLabel,
  FloatingMenu,
  SidebarIcon,
  SidebarPannel,
  SideBarProfile,
} from '..';

import * as styles from './sidebar.css';

type IconNameType = ComponentProps<typeof Icon>['name'];

const MENU_ITEMS = [
  {
    id: 'new',
    label: '새 메모',
    icon: 'ic_newmemo',
    activeIcon: 'ic_newmemo_blue',
  },
  {
    id: 'all',
    label: '전체 메모',
    icon: 'ic_allmemo',
    activeIcon: 'ic_allmemo_blue',
  },
  { id: 'ai', label: 'AI 기록', icon: 'ic_ai', activeIcon: 'ic_ai_blue_36' },
] as const;

const LABEL_ITEMS = [
  { id: 'sopt', label: 'sopt', icon: 'ic_label', activeIcon: 'ic_label_blue' },
  {
    id: 'home',
    label: '집안일',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
  {
    id: 'project',
    label: '프로젝트',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
  {
    id: 'school',
    label: '학교',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
] as const;

interface SidebarProps {
  userId: string;
  userEmail: string;
}

const Sidebar = ({ userId, userEmail }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState('new');

  const renderItem = (
    id: string,
    label: string,
    iconName: IconNameType,
    activeIconName: IconNameType,
    mode?: 'panel' | 'icon',
  ) => {
    const isSelected = selectedId === id;
    const currentIcon =
      isSelected && activeIconName ? activeIconName : iconName;
    const IconNode = <Icon name={currentIcon} width={36} height={36} />;

    const showPanel = mode === 'panel' || (mode === undefined && isExpanded);

    if (showPanel) {
      return (
        <SidebarPannel
          key={id}
          isSelected={isSelected}
          onClick={() => setSelectedId(id)}
          icon={IconNode}
        >
          {label}
        </SidebarPannel>
      );
    }

    return (
      <div key={id} className={styles.iconContainer}>
        <SidebarIcon
          isSelected={isSelected}
          onClick={() => setSelectedId(id)}
          icon={IconNode}
        />

        <div className={styles.floatingMenu}>
          <FloatingMenu menuName={label} />
        </div>
      </div>
    );
  };

  return (
    <nav className={styles.container({ expanded: isExpanded })}>
      <div className={styles.header}>
        {/* 조건부 렌더링 제거 -> CSS로 부드럽게 제어 */}
        <div className={styles.logo({ expanded: isExpanded })} />
        <span className={styles.title({ expanded: isExpanded })}>큰랍스타</span>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.foldingBtn}
        >
          <Icon name="ic_folding" width={36} height={36} />
          {!isExpanded && (
            <div className={styles.floatingMenu}>
              <FloatingMenu menuName="사이드바 열기" />
            </div>
          )}
        </button>
      </div>

      <span className={styles.menu({ expanded: isExpanded })}>메뉴</span>
      <div className={styles.menuList({ expanded: isExpanded })}>
        {MENU_ITEMS.map((item) =>
          renderItem(item.id, item.label, item.icon, item.activeIcon),
        )}
      </div>

      <span className={styles.label({ expanded: isExpanded })}>라벨</span>

      <div className={styles.labelList({ expanded: isExpanded })}>
        <div className={styles.expandedLabelGroup({ visible: isExpanded })}>
          {LABEL_ITEMS.map((item) =>
            renderItem(
              item.id,
              item.label,
              item.icon,
              item.activeIcon,
              'panel',
            ),
          )}
        </div>

        <div className={styles.collapsedLabelGroup({ visible: !isExpanded })}>
          <div className={styles.iconContainer}>
            <SidebarIcon
              isSelected={false}
              onClick={() => setIsExpanded(true)}
              icon={<Icon name="ic_label" width={36} height={36} />}
            />
            <div className={styles.floatingMenu}>
              <FloatingLabel
                labels={LABEL_ITEMS.map(({ id, label }) => ({
                  id,
                  name: label,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sidebarBottom({ expanded: isExpanded })}>
        {renderItem('trash', '휴지통', 'ic_trash', 'ic_trash_blue')}

        {isExpanded ? (
          <SideBarProfile userId={userId} userEmail={userEmail} />
        ) : (
          <div className={styles.iconContainer}>
            <SidebarIcon
              isSelected={false}
              onClick={() => {}}
              icon={<Icon name="ic_profile" width={36} height={36} />}
            />
            <div className={styles.floatingMenu}>
              <FloatingMenu menuName={userId} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
