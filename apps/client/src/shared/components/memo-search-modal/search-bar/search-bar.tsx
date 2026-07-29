import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './search-bar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

const DEFAULT_PLACEHOLDER = '찾으시는 메모의 내용을 입력하세요.';

const SearchBar = ({ value, onChange, onEnter }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);
  const hasSearchValue = value.trim().length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (value.length === 0) {
      setIsClearButtonVisible(false);
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsClearButtonVisible(false);
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    if (!hasSearchValue) return;

    setIsClearButtonVisible(true);
    onEnter();
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setIsClearButtonVisible(false);
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {isClearButtonVisible && hasSearchValue && (
        <button type="button" aria-label="검색어 지우기" onClick={handleClear}>
          <Icon name="ic_delete" color="grey700" size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
