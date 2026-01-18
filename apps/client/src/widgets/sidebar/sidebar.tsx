import { useState } from 'react';

import { Icon } from '@cds/icon';
import { IconName } from '@cds/icon';
import {
  FloatingLabel,
  FloatingMenu,
  SidebarIcon,
  SidebarPannel,
  SideBarProfile,
} from '@cds/ui';

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
  {
    id: 'project',
    label: '졸업 프로젝트',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
  {
    id: 'general',
    label: '교양',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
  {
    id: 'sopt',
    label: 'SOPT',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
  {
    id: 'reference',
    label: '레퍼런스',
    icon: 'ic_label',
    activeIcon: 'ic_label_blue',
  },
] as const;

interface SidebarProps {
  userId: string;
  userEmail: string;
  isExpanded: boolean;
  onToggle: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
}

const getIconState = (
  item: { id: string; icon: IconName; activeIcon: IconName },
  currentSelectedId: string,
) => {
  const isActive = currentSelectedId === item.id;
  const iconName = isActive ? item.activeIcon : item.icon;
  return { isActive, iconName };
};

const FLOATING_LABEL_ITEMS = LABEL_ITEMS.map((item) => ({
  id: item.id,
  name: item.label,
}));

const Sidebar = ({
  userId,
  userEmail,
  isExpanded,
  onToggle,
  selectedId,
  onSelect,
}: SidebarProps) => {
  const [isHover, setIsHover] = useState(false);

  const processedMenuItems = MENU_ITEMS.map((item) => ({
    ...item,
    ...getIconState(item, selectedId),
  }));

  const processedLabelItems = LABEL_ITEMS.map((item) => ({
    ...item,
    ...getIconState(item, selectedId),
  }));

  return (
    <nav className={styles.container({ expanded: isExpanded })}>
      <div className={styles.header}>
        <div className={styles.logo({ expanded: isExpanded })}>
          <Icon name="ic_logo_symbol" width={36} height={36} />
        </div>
        <span className={styles.title({ expanded: isExpanded })}>
          <Icon name="ic_logo_type" width={92.3} height={12} />
        </span>

        <button
          type="button"
          onClick={onToggle}
          className={styles.foldingBtn}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Icon
            name={isExpanded || isHover ? 'ic_folding' : 'ic_logo_symbol'}
            width={36}
            height={36}
          />
          {!isExpanded && (
            <div className={styles.floatingMenu}>
              <FloatingMenu menuName="사이드바 열기" />
            </div>
          )}
        </button>
      </div>

      <span className={styles.menu({ expanded: isExpanded })}>메뉴</span>
      <div className={styles.menuList({ expanded: isExpanded })}>
        {processedMenuItems.map(({ id, label, isActive, iconName }) =>
          isExpanded ? (
            <SidebarPannel
              key={id}
              isSelected={isActive}
              onClick={() => onSelect(id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            >
              {label}
            </SidebarPannel>
          ) : (
            <div key={id} className={styles.iconContainer}>
              <SidebarIcon
                isSelected={isActive}
                onClick={() => onSelect(id)}
                icon={<Icon name={iconName} width={36} height={36} />}
              />
              <div className={styles.floatingMenu}>
                <FloatingMenu menuName={label} />
              </div>
            </div>
          ),
        )}
      </div>

      <span className={styles.label({ expanded: isExpanded })}>라벨</span>
      <div className={styles.labelList({ expanded: isExpanded })}>
        {isExpanded ? (
          processedLabelItems.map(({ id, label, isActive, iconName }) => (
            <SidebarPannel
              key={id}
              isSelected={isActive}
              onClick={() => onSelect(id)}
              icon={<Icon name={iconName} width={36} height={36} />}
            >
              {label}
            </SidebarPannel>
          ))
        ) : (
          <div className={styles.labelContainer}>
            <SidebarIcon
              isSelected={false}
              onClick={() => {
                onToggle();
                onSelect(LABEL_ITEMS[0].id);
              }}
              icon={<Icon name="ic_label" width={36} height={36} />}
            />
            <div className={styles.floatingLabel}>
              <FloatingLabel labels={FLOATING_LABEL_ITEMS} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.sidebarBottom({ expanded: isExpanded })}>
        {isExpanded ? (
          <>
            <SidebarPannel
              isSelected={selectedId === 'trash'}
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
            <div className={styles.profileWrapper}>
              <SideBarProfile userId={userId} userEmail={userEmail} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.iconContainer}>
              <SidebarIcon
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
