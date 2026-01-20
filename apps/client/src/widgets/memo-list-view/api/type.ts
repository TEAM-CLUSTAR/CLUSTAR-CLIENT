import { operations, paths } from '@shared/types/schema';

export type PromptCreateResponse =
  paths['/api/v1/chat-rooms']['post']['responses']['200']['content']['*/*'];

export type PromptDeleteRequest =
  operations['deleteChatRoom']['parameters']['path'];

export type PromptDeleteResponse =
  paths['/api/v1/chat-rooms/{chatRoomId}']['delete']['responses']['200']['content']['*/*'];
