import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import { IconName } from '@cds/icon';
import { Modal, Tooltip } from '@cds/ui';

import SidebarItem from '../sidebar-item/sidebar-item';

import * as styles from '../sidebar.css';

interface SidebarMenuSectionProps {
  selectedMenuId: string;
  onExpand: () => void;
}

interface MenuItem {
  id: string;
  iconName: IconName;
  text: string;
  path: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'new-memo',
    iconName: 'ic_newmemo',
    text: '새 메모',
    path: PATH.NEW_MEMO,
  },
  {
    id: 'all-memo',
    iconName: 'ic_allmemo',
    text: '모든 메모',
    path: PATH.ROOT,
  },
  {
    id: 'structure',
    iconName: 'ic_treeview',
    text: '구조화뷰',
    path: PATH.STRUCTURE,
  },
];

const SidebarMenuSection = ({
  selectedMenuId,
  onExpand,
}: SidebarMenuSectionProps) => {
  const navigate = useNavigate();

  const handleSelectMenu = (path: string) => {
    navigate(path);
    onExpand(); // 접힌 상태에서 메뉴 아이콘을 누른 경우
  };

  return (
    <ul className={styles.pannelList}>
      <Modal>
        <Modal.Trigger>
          <li key="search" className={styles.pannelItem}>
            <SidebarItem
              iconName="ic_search"
              content="검색"
              onClick={onExpand}
            />
            <div className={styles.tooltip}>
              <Tooltip title="검색" />
            </div>
          </li>
        </Modal.Trigger>
        <Modal.Content>임시 모달</Modal.Content>
      </Modal>
      {MENU_ITEMS.map(({ id, iconName, text, path }) => (
        <li key={id} className={styles.pannelItem}>
          <SidebarItem
            iconName={iconName}
            content={text}
            isSelected={selectedMenuId === path}
            onClick={() => handleSelectMenu(path)}
          />
          <div className={styles.tooltip}>
            <Tooltip title={text} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenuSection;
