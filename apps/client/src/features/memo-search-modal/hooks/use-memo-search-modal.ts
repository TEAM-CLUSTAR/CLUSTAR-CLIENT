import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  recentViewedMemosQueryOptions,
  searchMemosQueryOptions,
} from '../apis/queries';
import type {
  MemoRecentViewedItemResponse,
  MemoRecentViewedSource,
  MemoSearchItemResponse,
} from '../apis/type';
import type { MemoSearchItemData } from '../types';

interface UseMemoSearchModalParams {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_RECENT_SOURCE: MemoRecentViewedSource = 'RECENT_VIEWED';

const mapMemoToData = (
  memo: MemoSearchItemResponse | MemoRecentViewedItemResponse,
): MemoSearchItemData => ({
  memoId: memo.memoId,
  title: memo.title,
  content: memo.content,
  openedAt: memo.lastViewedAt ?? memo.createdAt,
  tags: memo.tagList,
});

const useMemoSearchModal = ({
  open,
  onOpenChange,
}: UseMemoSearchModalParams) => {
  const [searchValue, setSearchValue] = useState('');
  const [submittedSearchValue, setSubmittedSearchValue] = useState<
    string | undefined
  >();
  const hasSubmittedSearch = submittedSearchValue !== undefined;

  const recentViewedMemosQuery = useQuery({
    ...recentViewedMemosQueryOptions(),
    enabled: open && !hasSubmittedSearch,
    select: (response) => ({
      source: response.data?.source ?? DEFAULT_RECENT_SOURCE,
      memos: response.data?.results.map(mapMemoToData) ?? [],
    }),
  });

  const searchMemosQuery = useQuery({
    ...searchMemosQueryOptions(submittedSearchValue ?? ''),
    enabled: open && hasSubmittedSearch,
    select: (response) => response.data?.results.map(mapMemoToData) ?? [],
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSearchValue('');
      setSubmittedSearchValue(undefined);
    }

    onOpenChange(nextOpen);
  };

  const handleSearch = (value: string) => {
    setSubmittedSearchValue(value);
  };

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);

    if (value.trim().length === 0) {
      setSubmittedSearchValue(undefined);
    }
  };

  return {
    searchValue,
    recentMemos: recentViewedMemosQuery.data?.memos ?? [],
    recentSource: recentViewedMemosQuery.data?.source ?? DEFAULT_RECENT_SOURCE,
    searchResultMemos: hasSubmittedSearch ? searchMemosQuery.data : undefined,
    isLoading: hasSubmittedSearch
      ? searchMemosQuery.isFetching
      : recentViewedMemosQuery.isFetching,
    handleOpenChange,
    handleSearch,
    handleChangeSearchValue,
  };
};

export default useMemoSearchModal;
