import { ChangeEvent, KeyboardEvent, useRef } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './search-bar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

const DEFAULT_PLACEHOLDER = '찾으시는 메모의 내용을 입력하세요.';

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchValue = value.trim();
  const hasSearchValue = searchValue.length > 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;

    if (!hasSearchValue) return;

    onSearch(searchValue);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <Icon name="ic_search" size={24} />
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        value={value}
        placeholder={DEFAULT_PLACEHOLDER}
        aria-label="메모 검색"
        autoFocus
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {hasSearchValue && (
        <button type="button" aria-label="검색어 지우기" onClick={handleClear}>
          <Icon name="ic_delete" color="grey700" size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
