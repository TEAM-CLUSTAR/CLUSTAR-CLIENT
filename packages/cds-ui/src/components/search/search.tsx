import { ChangeEvent, KeyboardEvent } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './search.css';

interface SearchProps {
  inputValue: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const Search = ({ inputValue, handleChangeInput, onEnter }: SearchProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Icon name="ic_search" width={40} height={40} />
      <input
        className={styles.input}
        placeholder="메모를 검색하세요."
        value={inputValue}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        aria-label="메모 검색"
      />
    </div>
  );
};

export default Search;
