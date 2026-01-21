import { components, operations, paths } from '@shared/types/schema';

import { AiOption } from '@features/ai-prompt';

export type PromptCreateResponse =
  paths['/api/v1/chat-rooms']['post']['responses']['200']['content']['*/*'];

export type PromptDeleteRequest =
  operations['deleteChatRoom']['parameters']['path'];

export type PromptDeleteResponse =
  paths['/api/v1/chat-rooms/{chatRoomId}']['delete']['responses']['200']['content']['*/*'];

export type AiCreateRequest = {
  chatRoomId: number;
  body: Omit<components['schemas']['MemoAiRequest'], 'option'> & {
    option?: AiOption;
  };
};

export type AiCreateResponse =
  paths['/api/v1/chat-rooms/{chatRoomId}/chat']['post']['responses']['200']['content']['*/*'];

export type AiSaveRequest =
  operations['createAiMemo']['requestBody']['content']['application/json'];

export type AiSaveResponse =
  paths['/api/v1/memo/ai']['post']['responses']['200']['content']['*/*'];
