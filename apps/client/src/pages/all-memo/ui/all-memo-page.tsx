import { useCallback, useState } from 'react';

import { FloatingButton } from '@cds/ui';

import { useAiMode } from '@shared/contexts/ai-mode-context';

import { AiPrompt } from '@widgets/ai-prompt';
import { Header } from '@widgets/header';
import { MemoCardGrid, MemoSelectionGrid } from '@widgets/memo-list';

import { useAllMemo } from '../hooks/use-all-memo';

import * as styles from './all-memo-page.css';

interface AllMemoPageProps {
  title?: string;
  count?: number;
}

const AllMemoPage = ({ title = '메모', count }: AllMemoPageProps) => {
  const { isAiMode, setIsAiMode } = useAiMode();
  const [viewMode, setViewMode] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchInput,
    filteredMemos,
    memoCount,
    handleChangeInput,
    handleSearchEnter,
    resetSearch,
    selectedCardIds,
    selectedMemos,
    handleCardClick,
  } = useAllMemo(count, isAiMode, isLoading);

  // 정리 진행하기 버튼 클릭 시 AI 모드 토글
  const handleFloatingButtonClick = useCallback(() => {
    setIsAiMode((prev) => !prev);
  }, [setIsAiMode]);

  // AI 모드 종료 시 검색어 초기화
  const handleCloseAiPrompt = useCallback(() => {
    setIsAiMode(false);
    resetSearch();
  }, [setIsAiMode, resetSearch]);

  // 뷰 모드 변경 시 뷰 모드 설정
  const handleValueChange = useCallback((value: string) => {
    setViewMode(value);
  }, []);

  return (
    <div className={styles.homePageContainer({ isAiMode })}>
      <div className={styles.contentWrapper({ isAiMode })}>
        <Header
          title={title}
          count={memoCount}
          inputValue={searchInput}
          handleChangeInput={handleChangeInput}
          viewMode={viewMode}
          handleValueChange={handleValueChange}
          isAiMode={isAiMode}
          onSearchEnter={handleSearchEnter}
        />
        {isAiMode ? (
          <MemoSelectionGrid
            memos={filteredMemos}
            selectedIds={selectedCardIds}
            onSelect={handleCardClick}
            disabled={isLoading}
          />
        ) : (
          <MemoCardGrid memos={filteredMemos} />
        )}
      </div>

      {isAiMode && (
        <div className={styles.aiPromptContainer}>
          <AiPrompt
            isAIOpen={isAiMode}
            selectedMemos={selectedMemos}
            handleClose={handleCloseAiPrompt}
            onLoadingChange={setIsLoading}
          />
        </div>
      )}

      {!isAiMode && (
        <div className={styles.floatingButtonContainer}>
          <FloatingButton
            isActive={true}
            handleClick={handleFloatingButtonClick}
          >
            정리 진행하기
          </FloatingButton>
        </div>
      )}
    </div>
  );
};

export default AllMemoPage;
