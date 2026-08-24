import { Modal } from '@cds/ui';

import memoImage from '@shared/assets/images/empty-state/memo_image.svg';
import searchImage from '@shared/assets/images/empty-state/search_image.svg';
import EmptyState from '@shared/components/empty-state/empty-state';

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
  const isEmpty = memos.length === 0;
  const resultCount = searchResultMemos?.length ?? 0;
  const sectionTitle = isSearchResult
    ? getSearchResultSectionTitle(resultCount)
    : '최근 열람한 메모';
  const emptyState = isSearchResult
    ? {
        imageSrc: searchImage,
        title: '결과 없음',
        description: '해당 단어를 포함하는 메모를 찾을 수 없습니다.',
      }
    : {
        imageSrc: memoImage,
        title: '작성된 메모가 없습니다.',
        description: '새 메모 창에 들어가서 새로운 메모를 생성해보세요.',
      };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className={styles.content} ariaLabel="메모 검색">
        <div className={styles.container}>
          <SearchBar
            value={searchValue}
            onChange={onChangeSearchValue}
            onSearch={onSearch}
          />
          <div className={styles.body({ isEmpty })}>
            {!isEmpty ? (
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
              <div className={styles.emptyStateContainer}>
                <EmptyState
                  imageSrc={emptyState.imageSrc}
                  title={emptyState.title}
                  description={emptyState.description}
                />
              </div>
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default MemoSearchModal;
