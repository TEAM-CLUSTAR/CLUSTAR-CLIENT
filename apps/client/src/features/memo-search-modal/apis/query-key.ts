export const MEMO_SEARCH_MODAL_KEY = {
  ALL: ['memo-search-modal'] as const,
  SEARCH: (query: string) =>
    [...MEMO_SEARCH_MODAL_KEY.ALL, 'search', query] as const,
  RECENT_VIEWED: () => [...MEMO_SEARCH_MODAL_KEY.ALL, 'recent-viewed'] as const,
} as const;
