import { ChangeEvent } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './search.css';

interface SearchProps {
  inputValue: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ inputValue, handleChangeInput }: SearchProps) => {
  return (
    <div className={styles.searchContainer}>
      <Icon name="ic_search" size={40} cursor="pointer" />
      <input
        className={styles.input}
        placeholder="메모를 검색하세요."
        value={inputValue}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Search;
