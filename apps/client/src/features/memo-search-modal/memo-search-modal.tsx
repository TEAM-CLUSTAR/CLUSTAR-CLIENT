import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import { Modal } from '@cds/ui';

import memoImage from '@shared/assets/images/empty-state/memo_image.svg';
import searchImage from '@shared/assets/images/empty-state/search_image.svg';
import EmptyState from '@shared/components/empty-state/empty-state';

import type { MemoRecentViewedSource } from './apis/type';
import MemoSearchListItem from './components/memo-search-list-item/memo-search-list-item';
import SearchBar from './components/search-bar/search-bar';
import useMemoSearchModal from './hooks/use-memo-search-modal';

import * as styles from './memo-search-modal.css';

interface MemoSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_STATE = {
  recent: {
    imageSrc: memoImage,
    title: '작성된 메모가 없습니다.',
    description: '새 메모 창에 들어가서 새로운 메모를 생성해보세요.',
  },
  search: {
    imageSrc: searchImage,
    title: '결과 없음',
    description: '해당 단어를 포함하는 메모를 찾을 수 없습니다.',
  },
} as const;

const getRecentSectionTitle = (source: MemoRecentViewedSource) => {
  return source === 'RECENT_CREATED' ? '최근 생성한 메모' : '최근 열람한 메모';
};

const MemoSearchModal = ({ open, onOpenChange }: MemoSearchModalProps) => {
  const navigate = useNavigate();
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
  const isSearchResult = searchResultMemos !== undefined;
  const memos = searchResultMemos ?? recentMemos;
  const isEmpty = memos.length === 0;
  const resultCount = searchResultMemos?.length ?? 0;
  const sectionTitle = isSearchResult
    ? `검색 결과(${resultCount}개)`
    : getRecentSectionTitle(recentSource);
  const emptyState = isSearchResult ? EMPTY_STATE.search : EMPTY_STATE.recent;

  const handleClickMemo = (memoId: number) => {
    navigate(`${PATH.MEMO}/${memoId}`);
    handleOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <Modal.Content className={styles.content} ariaLabel="메모 검색">
        <div className={styles.container}>
          <SearchBar
            value={searchValue}
            onChange={handleChangeSearchValue}
            onSearch={handleSearch}
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
                      onClickMemo={handleClickMemo}
                    />
                  ))}
                </div>
              </>
            ) : !isLoading ? (
              <div className={styles.emptyStateContainer}>
                <EmptyState
                  imageSrc={emptyState.imageSrc}
                  title={emptyState.title}
                  description={emptyState.description}
                />
              </div>
            ) : null}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default MemoSearchModal;
