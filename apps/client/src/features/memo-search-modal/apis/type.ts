import type { components, paths } from '@shared/types/schema';

export type MemoSearchResponse =
  paths['/api/v1/memo/search']['get']['responses']['200']['content']['*/*'];

export type MemoSearchItemResponse =
  components['schemas']['MemoSearchItemResponse'] & {
    lastViewedAt?: string | null;
  };

export type MemoRecentViewedItemResponse = Pick<
  MemoSearchItemResponse,
  'memoId' | 'title' | 'content' | 'tagList' | 'createdAt'
> & {
  lastViewedAt?: string | null;
};

export type MemoRecentViewedSource = 'RECENT_VIEWED' | 'RECENT_CREATED';

export interface MemoRecentViewedResponse {
  code: number;
  msg: string;
  data?: {
    source?: MemoRecentViewedSource;
    results: MemoRecentViewedItemResponse[];
  };
}
