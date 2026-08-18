import { Modal } from '@cds/ui';

import MemoSearchListItem from './components/memo-search-list-item/memo-search-list-item';
import SearchBar from './components/search-bar/search-bar';
import { MemoSearchItemData } from './types';

import * as styles from './memo-search-modal.css';

const getSearchResultSectionTitle = (count: number) => {
  return `검색 결과(${count}개)`;
};

interface MemoSearchModalProps {
  open: boolean;
  searchValue: string;
  recentMemos: MemoSearchItemData[];
  searchResultMemos?: MemoSearchItemData[];
  onOpenChange: (open: boolean) => void;
  onChangeSearchValue: (value: string) => void;
  onSearch: (value: string) => void;
  onClickMemo: (memoId: number) => void;
}

const MemoSearchModal = ({
  open,
  searchValue,
  recentMemos,
  searchResultMemos,
  onOpenChange,
  onChangeSearchValue,
  onSearch,
  onClickMemo,
}: MemoSearchModalProps) => {
  const isSearchResult = searchResultMemos !== undefined;
  const memos = searchResultMemos ?? recentMemos;
  const resultCount = searchResultMemos?.length ?? 0;
  const sectionTitle = isSearchResult
    ? getSearchResultSectionTitle(resultCount)
    : '최근 열람한 메모';

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className={styles.content} ariaLabel="메모 검색">
        <div className={styles.container}>
          <SearchBar
            value={searchValue}
            onChange={onChangeSearchValue}
            onSearch={onSearch}
          />
          <div className={styles.body}>
            {memos.length > 0 ? (
              <>
                <span className={styles.sectionTitle}>{sectionTitle}</span>
                <div className={styles.list}>
                  {memos.map((memo) => (
                    <MemoSearchListItem
                      key={memo.memoId}
                      memo={memo}
                      onClickMemo={onClickMemo}
                    />
                  ))}
                </div>
              </>
            ) : (
              // TODO: empty view 컴포넌트 디자인 확정되는 대로 교체 예정
              <p className={styles.emptyText}>표시할 메모가 없습니다.</p>
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default MemoSearchModal;
