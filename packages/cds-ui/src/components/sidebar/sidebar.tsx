import { useState } from 'react';

import { Icon } from '@cds/icon';

import {
  FloatingLabel,
  FloatingMenu,
  SidebarIcon,
  SidebarPannel,
  SideBarProfile,
} from '..';

import * as styles from './sidebar.css';

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

  return (
    <nav className={styles.container({ expanded: isExpanded })}>
      <div className={styles.header}>
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
            <div key={item.id} className={styles.iconContainer}>
              <SidebarIcon
                isSelected={isActive}
                onClick={() => setSelectedId(item.id)}
                icon={<Icon name={iconName} width={36} height={36} />}
              />
              <div className={styles.floatingMenu}>
                <FloatingMenu menuName={item.label} />
              </div>
            </div>
          );
        })}
      </div>

      <span className={styles.label({ expanded: isExpanded })}>라벨</span>
      <div className={styles.labelList({ expanded: isExpanded })}>
        {isExpanded ? (
          LABEL_ITEMS.map((item) => {
            const isActive = selectedId === item.id;
            const iconName = isActive ? item.activeIcon : item.icon;

            return (
              <SidebarPannel
                key={item.id}
                isSelected={isActive}
                onClick={() => setSelectedId(item.id)}
                icon={<Icon name={iconName} width={36} height={36} />}
              >
                {item.label}
              </SidebarPannel>
            );
          })
        ) : (
          <div className={styles.iconContainer}>
            <SidebarIcon
              isSelected={false}
              onClick={() => setIsExpanded(true)}
              icon={<Icon name="ic_label" width={36} height={36} />}
            />

            <div className={styles.floatingLabel}>
              <FloatingLabel
                labels={LABEL_ITEMS.map((item) => ({
                  id: item.id,
                  name: item.label,
                }))}
              />
            </div>
          </div>
        )}
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
            <SideBarProfile userId={userId} userEmail={userEmail} />
          </>
        ) : (
          <>
            <div className={styles.iconContainer}>
              <SidebarIcon
                isSelected={false}
                onClick={() => setSelectedId('trash')}
                icon={
                  selectedId === 'trash' ? (
                    <Icon name="ic_trash_blue" width={36} height={36} />
                  ) : (
                    <Icon name="ic_trash" width={36} height={36} />
                  )
                }
              />
              <div className={styles.floatingMenu}>
                <FloatingMenu menuName="휴지통" />
              </div>
            </div>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
