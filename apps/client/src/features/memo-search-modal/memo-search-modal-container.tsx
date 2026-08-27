import { useState } from 'react';

import MemoSearchModal from './memo-search-modal';
import type { MemoSearchItemData } from './types';

interface MemoSearchModalContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MemoSearchModalContainer = ({
  open,
  onOpenChange,
}: MemoSearchModalContainerProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResultMemos, setSearchResultMemos] = useState<
    MemoSearchItemData[] | undefined
  >();

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSearchValue('');
      setSearchResultMemos(undefined);
    }

    onOpenChange(nextOpen);
  };

  const handleSearch = () => {
    setSearchResultMemos([]);
  };

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);

    if (value.trim().length === 0) {
      setSearchResultMemos(undefined);
    }
  };

  return (
    <MemoSearchModal
      open={open}
      searchValue={searchValue}
      recentMemos={[]}
      searchResultMemos={searchResultMemos}
      onOpenChange={handleOpenChange}
      onChangeSearchValue={handleChangeSearchValue}
      onSearch={handleSearch}
      onClickMemo={() => onOpenChange(false)}
    />
  );
};

export default MemoSearchModalContainer;
