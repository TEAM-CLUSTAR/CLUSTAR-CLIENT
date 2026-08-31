export const CHAT_ROOM_END_POINT = {
  ACTIVE: '/api/v1/chat-rooms/active',
  CREATE: '/api/v1/chat-rooms',
  DELETE: '/api/v1/chat-rooms/{chatRoomId}',
};

export const AI_END_POINT = {
  CREATE: '/api/v1/chat-rooms/{chatRoomId}/chat',
  RECOMMENDATIONS: '/api/v1/memo/recommendations',
  SAVE: '/api/v1/memo/ai',
};
