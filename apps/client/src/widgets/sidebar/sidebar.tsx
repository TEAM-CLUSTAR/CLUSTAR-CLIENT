import { useMemo, useState } from 'react';

import { Icon } from '@cds/icon';
import { IconName } from '@cds/icon';
import {
  FloatingLabel,
  FloatingMenu,
  SidebarIcon,
  SidebarPannel,
  SideBarProfile,
} from '@cds/ui';

import { useGetLabel } from '@pages/all-memo/api/queries';

import { useGetUserInfo } from './api/queries';

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

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
  setIsTreeViewOpen: (value: boolean) => void;
  isTreeViewOpen: boolean;
  onLogoClick?: () => void;
}

const getIconState = (
  item: { id: string; icon: IconName; activeIcon: IconName },
  currentSelectedId: string,
) => {
  const isActive = currentSelectedId === item.id;
  const iconName = isActive ? item.activeIcon : item.icon;
  return { isActive, iconName };
};

const Sidebar = ({
  isExpanded,
  onToggle,
  selectedId,
  onSelect,
  setIsTreeViewOpen,
  isTreeViewOpen,
  onLogoClick,
}: SidebarProps) => {
  const [isHover, setIsHover] = useState(false);
  const { data: userInfo } = useGetUserInfo();
  const { data: labels = [] } = useGetLabel();

  const labelItems = useMemo(() => {
    return labels.map((label) => ({
      id: String(label.labelId ?? ''),
      label: label.name ?? '',
      icon: 'ic_label' as IconName,
      activeIcon: 'ic_label_blue' as IconName,
    }));
  }, [labels]);

  const FLOATING_LABEL_ITEMS = useMemo(() => {
    return labelItems.map((item) => ({
      id: item.id,
      name: item.label,
    }));
  }, [labelItems]);

  const processedMenuItems = MENU_ITEMS.map((item) => ({
    ...item,
    ...getIconState(item, selectedId),
  }));

  const processedLabelItems = labelItems.map((item) => ({
    ...item,
    ...getIconState(item, selectedId),
  }));

  return (
    <nav className={styles.container({ expanded: isExpanded })}>
      <div className={styles.header}>
        {isExpanded && (
          <>
            <div
              className={styles.logo({ expanded: isExpanded })}
              onClick={onLogoClick}
              style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
            >
              <Icon
                name="ic_logo_symbol"
                width={36}
                height={36}
                style={{ pointerEvents: 'none' }}
              />
            </div>
            <span
              className={styles.title({ expanded: isExpanded })}
              onClick={onLogoClick}
              style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
            >
              <Icon
                name="ic_logo_type"
                width={92.3}
                height={12}
                style={{ pointerEvents: 'none' }}
              />
            </span>
          </>
        )}

        <button
          type="button"
          onClick={() => {
            if (!isExpanded) {
              if (onLogoClick) {
                onLogoClick();
              } else {
                onToggle();
              }
            } else {
              onToggle();
            }
          }}
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
                if (labelItems.length > 0) {
                  if (isTreeViewOpen) {
                    setIsTreeViewOpen(false);
                    onSelect(labelItems[0].id);
                  } else {
                    onToggle();
                    onSelect(labelItems[0].id);
                  }
                }
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
              <SideBarProfile
                name={userInfo?.name}
                email={userInfo?.email}
                profileImageUrl={userInfo?.profileImageUrl}
              />
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
                <FloatingMenu menuName={userInfo?.name || '프로필'} />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
