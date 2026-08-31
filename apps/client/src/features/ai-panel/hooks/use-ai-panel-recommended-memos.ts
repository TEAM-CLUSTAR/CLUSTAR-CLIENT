import { useCallback, useEffect, useState } from 'react';

import { useGetRecommendedMemos } from '../apis/queries';
import type { MemoRecommendationItemResponse } from '../apis/type';
import type { SelectedMemoType } from '../types/ai-panel.types';
import { mapRecommendedMemos } from './ai-panel-chat.mapper';

interface UseAiPanelRecommendedMemosParams {
  memoIds: number[];
  selectedMemos: SelectedMemoType[];
}

export const useAiPanelRecommendedMemos = ({
  memoIds,
  selectedMemos,
}: UseAiPanelRecommendedMemosParams) => {
  const [initialRecommendedMemos, setInitialRecommendedMemos] = useState<
    MemoRecommendationItemResponse[] | null
  >(null);

  const recommendedMemosQuery = useGetRecommendedMemos(
    memoIds,
    memoIds.length > 0 && initialRecommendedMemos === null,
  );

  useEffect(() => {
    const recommendedMemos = recommendedMemosQuery.data?.data?.results;
    if (!recommendedMemos || initialRecommendedMemos !== null) return;

    setInitialRecommendedMemos(recommendedMemos);
  }, [initialRecommendedMemos, recommendedMemosQuery.data]);

  useEffect(() => {
    if (memoIds.length > 0) return;

    setInitialRecommendedMemos(null);
  }, [memoIds.length]);

  const resetRecommendedMemos = useCallback(() => {
    setInitialRecommendedMemos(null);
  }, []);

  return {
    recommendedMemos:
      memoIds.length > 0 && initialRecommendedMemos !== null
        ? mapRecommendedMemos(initialRecommendedMemos, selectedMemos)
        : [],
    resetRecommendedMemos,
  };
};
