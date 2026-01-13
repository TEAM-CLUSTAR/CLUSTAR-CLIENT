import { ChangeEvent } from 'react';

import { Icon } from '@cds/icon';

import PageTitle from '../page-title/page-title';
import Search from '../search/search';
import Toggle from '../toggle/toggle';

import * as styles from './header.css';

type ViewType = 'card' | 'tree';

interface HeaderProps {
  title: string;
  count: number;
  inputValue: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  viewMode: ViewType;
  handleValueChange: (value: string) => void;
}

const header = ({
  title,
  count,
  inputValue,
  handleChangeInput,
  viewMode,
  handleValueChange,
}: HeaderProps) => {
  return (
    <header className={styles.container}>
      <PageTitle title={title} count={count} />
      <Search inputValue={inputValue} handleChangeInput={handleChangeInput} />
      <Toggle selectedValue={viewMode} handleValueChange={handleValueChange}>
        <Toggle.Item itemValue="card">
          <Icon
            name={viewMode === 'card' ? 'ic_cardview_on' : 'ic_cardview_off'}
            width={28}
            height={28}
          />
        </Toggle.Item>
        <Toggle.Item itemValue="tree">
          <Icon
            name={viewMode === 'tree' ? 'ic_treeview_on' : 'ic_treeview_off'}
            width={28}
            height={28}
          />
        </Toggle.Item>
      </Toggle>
    </header>
  );
};

export default header;
