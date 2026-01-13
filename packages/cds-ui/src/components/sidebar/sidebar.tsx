import { useState } from 'react';

import { Icon } from '@cds/icon';

import { SidebarIcon, SidebarPannel, SideBarProfile } from '..';

import * as styles from './sidebar.css';

const MENU_ITEMS = [
  {
    id: 'new',
    label: '새 메모',
    icon: 'ic_newmemo' as const,
    activeIcon: 'ic_newmemo_blue' as const,
  },
  {
    id: 'all',
    label: '전체 메모',
    icon: 'ic_allmemo' as const,
    activeIcon: 'ic_allmemo_blue' as const,
  },
  {
    id: 'ai',
    label: 'AI 기록',
    icon: 'ic_ai' as const,
    activeIcon: 'ic_ai_blue_36' as const,
  },
];

const LABEL_ITEMS = [
  {
    id: 'sopt',
    label: 'sopt',
    icon: 'ic_label' as const,
    activeIcon: 'ic_label_blue' as const,
  },
  {
    id: 'home',
    label: '집안일',
    icon: 'ic_label' as const,
    activeIcon: 'ic_label_blue' as const,
  },
  {
    id: 'project',
    label: '프로젝트',
    icon: 'ic_label' as const,
    activeIcon: 'ic_label_blue' as const,
  },
  {
    id: 'school',
    label: '학교',
    icon: 'ic_label' as const,
    activeIcon: 'ic_label_blue' as const,
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState('new');

  return (
    <div className={styles.container({ expanded: isExpanded })}>
      <div className={styles.header}>
        {isExpanded && (
          <>
            <div className={styles.logo} /> {/*@TODO 로고 변경하기 */}
            <span className={styles.title}>큰랍스타</span>
          </>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.foldingBtn}
        >
          <Icon name="ic_folding" width={36} height={36} />
        </button>
      </div>

      {isExpanded && <span className={styles.menu}>메뉴</span>}
      <div className={styles.menuList({ expanded: isExpanded })}>
        {MENU_ITEMS.map((item) => {
          const isActive = selectedId === item.id;
          const iconName = isActive ? item.activeIcon : item.icon;

          return isExpanded ? (
            <SidebarPannel
              key={item.id}
              isSelected={isActive}
              onClick={() => setSelectedId(item.id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            >
              {item.label}
            </SidebarPannel>
          ) : (
            <SidebarIcon
              key={item.id}
              isSelected={isActive}
              onClick={() => setSelectedId(item.id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            />
          );
        })}
      </div>

      {isExpanded && <span className={styles.label}>라벨</span>}
      <div className={styles.labelList({ expanded: isExpanded })}>
        {LABEL_ITEMS.map((item) => {
          const isActive = selectedId === item.id;
          const iconName = isActive ? item.activeIcon : item.icon;

          return isExpanded ? (
            <SidebarPannel
              key={item.id}
              isSelected={isActive}
              onClick={() => setSelectedId(item.id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            >
              {item.label}
            </SidebarPannel>
          ) : (
            <SidebarIcon
              key={item.id}
              isSelected={isActive}
              onClick={() => setSelectedId(item.id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            />
          );
        })}
      </div>

      <div className={styles.sidebarBottom({ expanded: isExpanded })}>
        {isExpanded ? (
          <>
            <SidebarPannel
              isSelected={selectedId === 'trash'}
              onClick={() => setSelectedId('trash')}
              icon={
                selectedId === 'trash' ? (
                  <Icon name="ic_trash_blue" width={36} height={36} />
                ) : (
                  <Icon name="ic_trash" width={36} height={36} />
                )
              }
            >
              휴지통
            </SidebarPannel>
            <SideBarProfile userId="큰랍스터" userEmail="hello@glks.dmk" />
          </>
        ) : (
          <>
            <SidebarIcon
              isSelected={false}
              onClick={() => {}}
              icon={
                selectedId === 'trash' ? (
                  <Icon name="ic_trash_blue" width={36} height={36} />
                ) : (
                  <Icon name="ic_trash" width={36} height={36} />
                )
              }
            />
            <SidebarIcon
              isSelected={false}
              onClick={() => {}}
              icon={<Icon name="ic_profile" width={36} height={36} />}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
