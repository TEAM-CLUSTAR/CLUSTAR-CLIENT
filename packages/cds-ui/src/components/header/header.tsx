import { ChangeEvent } from 'react';

import { Icon } from '@cds/icon';

import PageTitle from '../page-title/page-title';
import Search from '../search/search';
import Toggle from '../toggle/toggle';

import * as styles from './header.css';
interface HeaderProps {
  title?: string;
  count?: number;
  inputValue: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  viewMode?: string;
  handleValueChange?: (value: string) => void;
  isTitleVisible: boolean;
  isToggleVisible: boolean;
}

const Header = ({
  title,
  count,
  inputValue,
  handleChangeInput,
  viewMode,
  handleValueChange,
  isTitleVisible,
  isToggleVisible,
}: HeaderProps) => {
  const showTitle =
    isTitleVisible && title !== undefined && count !== undefined;
  const showToggle =
    isToggleVisible &&
    viewMode !== undefined &&
    handleValueChange !== undefined;

  const isCard = viewMode === 'card';
  const isTree = viewMode === 'tree';

  return (
    <header className={styles.container}>
      {showTitle && <PageTitle title={title} count={count} />}
      <Search inputValue={inputValue} handleChangeInput={handleChangeInput} />
      {showToggle && (
        <Toggle selectedValue={viewMode} handleValueChange={handleValueChange}>
          <Toggle.Item itemValue="card">
            <Icon
              name={isCard ? 'ic_cardview_on' : 'ic_cardview_off'}
              width={28}
              height={28}
            />
          </Toggle.Item>
          <Toggle.Item itemValue="tree">
            <Icon
              name={isTree ? 'ic_treeview_on' : 'ic_treeview_off'}
              width={28}
              height={28}
            />
          </Toggle.Item>
        </Toggle>
      )}
    </header>
  );
};

export default Header;
