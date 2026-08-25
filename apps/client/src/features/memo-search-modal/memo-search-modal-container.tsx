import useMemoSearchModal from './hooks/use-memo-search-modal';
import MemoSearchModal from './memo-search-modal';

interface MemoSearchModalContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MemoSearchModalContainer = ({
  open,
  onOpenChange,
}: MemoSearchModalContainerProps) => {
  const {
    searchValue,
    recentMemos,
    recentSource,
    searchResultMemos,
    isLoading,
    handleOpenChange,
    handleSearch,
    handleChangeSearchValue,
  } = useMemoSearchModal({ open, onOpenChange });

  return (
    <MemoSearchModal
      open={open}
      searchValue={searchValue}
      recentMemos={recentMemos}
      recentSource={recentSource}
      searchResultMemos={searchResultMemos}
      isLoading={isLoading}
      onOpenChange={handleOpenChange}
      onChangeSearchValue={handleChangeSearchValue}
      onSearch={handleSearch}
      onClickMemo={() => onOpenChange(false)}
    />
  );
};

export default MemoSearchModalContainer;
