import MemoSearchModal from '@features/memo-search-modal/memo-search-modal';
import { PATH } from '@router/path';

import { IconName } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import MenuItem from '@shared/components/menu-item/menu-item';

import { SidebarSelection } from '../type';

import * as styles from '../sidebar.css';

interface SidebarMenuSectionProps {
  selection: SidebarSelection;
  onSelectMenu: (path: string) => void;
  onClickSearch: () => void;
  onExpand: () => void;
  isSearchMoalOpen: boolean;
  setIsSearchModalOpen: (value: boolean) => void;
}

interface MenuEntry {
  id: string;
  iconName: IconName;
  text: string;
  path: string;
}

const MENU_ITEMS: MenuEntry[] = [
  {
    id: 'new-memo',
    iconName: 'ic_newmemo',
    text: '새 메모',
    path: PATH.MEMO_NEW,
  },
  {
    id: 'all-memo',
    iconName: 'ic_allmemo',
    text: '모든 메모',
    path: PATH.MEMOS,
  },
];

const SidebarMenuSection = ({
  selection,
  onSelectMenu,
  onClickSearch,
  isSearchMoalOpen,
  setIsSearchModalOpen,
}: SidebarMenuSectionProps) => {
  const selectedMenuPath = selection.type === 'menu' ? selection.path : null;

  return (
    <ul className={styles.pannelList}>
      <li key="search" className={styles.pannelItem}>
        <MenuItem iconName="ic_search" content="검색" onClick={onClickSearch} />
        <div className={styles.tooltip}>
          <Tooltip title="검색" />
        </div>
      </li>
      <MemoSearchModal
        open={isSearchMoalOpen}
        onOpenChange={setIsSearchModalOpen}
      />
      {MENU_ITEMS.map(({ id, iconName, text, path }) => (
        <li key={id} className={styles.pannelItem}>
          <MenuItem
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
