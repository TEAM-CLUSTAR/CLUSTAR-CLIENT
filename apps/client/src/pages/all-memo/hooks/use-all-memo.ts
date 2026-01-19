import { useCallback, useEffect, useMemo, useState } from 'react';

import { SelectedMemo } from '@features/ai-prompt';

import { MOCK_MEMOS, MockMemo } from '@widgets/memo-list/ui/mock-memos';

// 검색 관련
interface UseMemoSearchReturn {
  searchInput: string;
  filteredMemos: MockMemo[];
  memoCount: number;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchEnter: () => void;
}

const useMemoSearch = (count?: number): UseMemoSearchReturn => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 입력 필드 값 변경 시 입력값만 업데이트 (필터링은 실행하지 않음)
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    [],
  );

  // 엔터 키 입력 시 검색어를 설정하여 필터링 실행
  const handleSearchEnter = useCallback(() => {
    setSearchQuery(searchInput.trim());
  }, [searchInput]);

  // 검색 필터링된 메모 목록
  const filteredMemos: MockMemo[] = useMemo(() => {
    if (!searchQuery) return MOCK_MEMOS;

    const query = searchQuery.toLowerCase();
    return MOCK_MEMOS.filter(
      (memo) =>
        memo.title.toLowerCase().includes(query) ||
        memo.contents.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  // 메모 개수
  const memoCount = useMemo(() => {
    return count !== undefined ? count : filteredMemos.length;
  }, [count, filteredMemos.length]);

  return {
    searchInput,
    filteredMemos,
    memoCount,
    handleChangeInput,
    handleSearchEnter,
  };
};

// 메모 선택 관련
interface UseMemoSelectionReturn {
  selectedCardIds: Set<string>;
  selectedMemos: SelectedMemo[];
  handleCardClick: (id: string) => void;
  setInitialSelectedId: (id: string) => void;
}

const useMemoSelection = (
  isAiMode: boolean,
  isLoading: boolean,
): UseMemoSelectionReturn => {
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(
    new Set(),
  );

  // 메모 선택
  const handleCardClick = useCallback(
    (id: string) => {
      if (isLoading) return;

      setSelectedCardIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else if (newSet.size < 5) {
          newSet.add(id);
        }
        return newSet;
      });
    },
    [isLoading],
  );

  // 초기 선택된 메모 ID 설정
  const setInitialSelectedId = useCallback((id: string) => {
    setSelectedCardIds(new Set([id]));
  }, []);

  // AI 모드 종료 시 선택 초기화
  useEffect(() => {
    if (!isAiMode) {
      setSelectedCardIds(new Set());
    }
  }, [isAiMode]);

  // 전체 메모를 Map으로 변환
  const allMemosMap = useMemo(() => {
    const map = new Map<string, MockMemo>();
    MOCK_MEMOS.forEach((memo) => {
      map.set(memo.id, memo);
    });
    return map;
  }, []);

  // 선택된 메모는 검색 필터링과 무관하게 전체 메모에서 조회
  const selectedMemos: SelectedMemo[] = useMemo(() => {
    return Array.from(selectedCardIds)
      .map((id) => allMemosMap.get(id))
      .filter((memo): memo is MockMemo => memo !== undefined)
      .map((memo) => ({
        id: memo.id,
        title: memo.title,
      }));
  }, [selectedCardIds, allMemosMap]);

  return {
    selectedCardIds,
    selectedMemos,
    handleCardClick,
    setInitialSelectedId,
  };
};

// 통합 훅
export const useAllMemo = (
  count?: number,
  isAiMode?: boolean,
  isLoading?: boolean,
) => {
  const search = useMemoSearch(count);
  const selection = useMemoSelection(isAiMode ?? false, isLoading ?? false);

  return {
    ...search,
    ...selection,
  };
};
