import { components, operations, paths } from '@shared/types/schema';

export type AiOption = NonNullable<
  components['schemas']['MemoAiRequest']['option']
> | null;

export type ChatRoomCreateResponse =
  paths['/api/v1/chat-rooms']['post']['responses']['200']['content']['*/*'];

export type ActiveChatMessageResponse = {
  messageId: number;
  role: 'USER' | 'ASSISTANT';
  status: 'SUCCESS' | 'FAILED';
  title: string | null;
  content: string | null;
  option: AiOption;
  memoIds: number[];
  createdAt: string;
};

export type ActiveChatRoomResponse = {
  code: number;
  msg: string;
  data?: {
    chatRoomId: number;
    messages: ActiveChatMessageResponse[];
  };
};

export type ChatRoomDeleteRequest =
  operations['deleteChatRoom']['parameters']['path'];

export type ChatRoomDeleteResponse =
  paths['/api/v1/chat-rooms/{chatRoomId}']['delete']['responses']['200']['content']['*/*'];

export type AiCreateRequest = {
  chatRoomId: number;
  body: Omit<components['schemas']['MemoAiRequest'], 'option'> & {
    option?: AiOption;
  };
};

export type AiCreateResponse =
  paths['/api/v1/chat-rooms/{chatRoomId}/chat']['post']['responses']['200']['content']['*/*'];

export type MemoRecommendationRequest =
  operations['recommendMemos']['requestBody']['content']['application/json'];

export type MemoRecommendationItemResponse =
  components['schemas']['MemoRecommendationItemResponse'];

export type MemoRecommendationResponse =
  paths['/api/v1/memo/recommendations']['post']['responses']['200']['content']['*/*'];

export type AiSaveRequest =
  operations['createAiMemo']['requestBody']['content']['application/json'];

export type AiSaveResponse =
  paths['/api/v1/memo/ai']['post']['responses']['200']['content']['*/*'];
