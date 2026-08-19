import { PATH } from '@router/path';

import { IconName } from '@cds/icon';
import { Modal, Tooltip } from '@cds/ui';

import NavItem from '@shared/components/nav-item/nav-item';

import { SidebarSelection } from '../type';

import * as styles from '../sidebar.css';

interface SidebarMenuSectionProps {
  selection: SidebarSelection;
  onSelectMenu: (path: string) => void;
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
  selection,
  onSelectMenu,
  onExpand,
}: SidebarMenuSectionProps) => {
  const selectedMenuPath = selection.type === 'menu' ? selection.path : null;

  return (
    <ul className={styles.pannelList}>
      <Modal>
        <Modal.Trigger>
          <li key="search" className={styles.pannelItem}>
            <NavItem iconName="ic_search" content="검색" onClick={onExpand} />
            <div className={styles.tooltip}>
              <Tooltip title="검색" />
            </div>
          </li>
        </Modal.Trigger>
        <Modal.Content>임시 모달</Modal.Content>
      </Modal>
      {MENU_ITEMS.map(({ id, iconName, text, path }) => (
        <li key={id} className={styles.pannelItem}>
          <NavItem
            iconName={iconName}
            content={text}
            isSelected={selectedMenuPath === path}
            onClick={() => onSelectMenu(path)}
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
