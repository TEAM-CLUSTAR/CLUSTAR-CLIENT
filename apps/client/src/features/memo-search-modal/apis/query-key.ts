export const MEMO_SEARCH_QUERY_KEY = {
  ALL: ['memo-search'] as const,
  SEARCH: (query: string) =>
    [...MEMO_SEARCH_QUERY_KEY.ALL, 'search', query] as const,
  RECENT_VIEWED: () => [...MEMO_SEARCH_QUERY_KEY.ALL, 'recent-viewed'] as const,
} as const;
