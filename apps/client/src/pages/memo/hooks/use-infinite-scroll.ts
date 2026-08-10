import { useEffect, useRef } from 'react';
import { type FetchNextPageOptions } from '@tanstack/react-query';

// 바닥에 닿기 전에 미리 불러와 로딩을 기다리는 구간을 없앤다
const LOAD_MORE_ROOT_MARGIN = '200px';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => void;
}

/**
 * 목록 끝에 둔 요소가 화면에 들어오면 다음 페이지를 불러오는 무한 스크롤 훅
 *
 *
 * @param hasNextPage - false면 관측하지 않는다
 * @param isFetchingNextPage - 패칭 중에는 관측을 멈춘다. 패칭이 끝나면 옵저버를
 *   다시 만들어 관측 요소가 계속 보이는 상태에서도 다음 페이지가 이어진다
 * @param fetchNextPage - cancelRefetch 기본값(true)은 진행 중인 요청을 취소하고
 *   재시작하므로 false로 넘겨 호출한다
 * @returns 목록 마지막에 배치할 요소의 ref
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMoreTarget = loadMoreRef.current;
    if (!loadMoreTarget || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchNextPage({ cancelRefetch: false });
      },
      { rootMargin: LOAD_MORE_ROOT_MARGIN },
    );
    observer.observe(loadMoreTarget);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return loadMoreRef;
};
