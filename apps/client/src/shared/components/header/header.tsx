import { ChangeEvent } from 'react';

import { Icon } from '@cds/icon';
import { PageTitle, Search, Toggle } from '@cds/ui';

import * as styles from './header.css';
interface HeaderProps {
  title?: string;
  count?: number;
  inputValue: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  viewMode?: string;
  handleValueChange?: (value: string) => void;
  isAiMode?: boolean;
  onSearchEnter?: () => void;
}

const Header = ({
  title,
  count,
  inputValue,
  handleChangeInput,
  viewMode,
  handleValueChange,
  isAiMode = false,
  onSearchEnter,
}: HeaderProps) => {
  const isCard = viewMode === 'card';
  const isTree = viewMode === 'tree';

  return (
    <header className={styles.header}>
      <div className={styles.container({ isAiMode, isTree })}>
        {!isAiMode && title && count !== undefined && (
          <PageTitle title={title} count={count} />
        )}
        <Search
          inputValue={inputValue}
          handleChangeInput={handleChangeInput}
          onEnter={onSearchEnter}
        />
        {!isAiMode && handleValueChange && viewMode && (
          <Toggle
            selectedValue={viewMode}
            handleValueChange={handleValueChange}
          >
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
      </div>
    </header>
  );
};

export default Header;
