export const CHAT_ROOM_KEY = {
  ALL: ['chat-rooms'],
  ACTIVE: () => [...CHAT_ROOM_KEY.ALL, 'active'],
  CREATE: () => [...CHAT_ROOM_KEY.ALL, 'create'],
  DELETE: () => [...CHAT_ROOM_KEY.ALL, 'delete'],
};

export const AI_KEY = {
  ALL: ['ai'],
  CREATE: () => [...AI_KEY.ALL, 'create'],
  RECOMMENDATIONS: (memoIds: number[]) => [
    ...AI_KEY.ALL,
    'recommendations',
    memoIds,
  ],
  SAVE: () => [...AI_KEY.ALL, 'save'],
};
