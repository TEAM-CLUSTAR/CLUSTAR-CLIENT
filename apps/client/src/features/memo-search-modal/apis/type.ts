import type { paths } from '@shared/types/schema';

export type MemoSearchResponse =
  paths['/api/v1/memo/search']['get']['responses']['200']['content']['*/*'];

export type MemoRecentViewedSource = 'RECENT_VIEWED' | 'RECENT_CREATED';

export interface MemoRecentViewedResponse {
  code: number;
  msg: string;
  data?: {
    source?: MemoRecentViewedSource;
    results: {
      memoId: number;
      title: string;
      content: string;
      tagList: NonNullable<
        MemoSearchResponse['data']
      >['results'][number]['tagList'];
      createdAt: string;
      lastViewedAt?: string | null;
    }[];
  };
}
