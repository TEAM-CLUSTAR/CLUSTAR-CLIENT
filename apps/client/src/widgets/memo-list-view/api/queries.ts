import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/api/instance';

import { PROMPT_END_POINT } from './end-point';
import { PROMPT_KEY } from './query-key';
import {
  PromptCreateResponse,
  PromptDeleteRequest,
  PromptDeleteResponse,
} from './type';

/**
 * AI 채팅방 생성
 * @returns 생성된 채팅방 ID(chatRoomId)
 */
const createChatRoom = async (): Promise<PromptCreateResponse> => {
  const response = await api.post<PromptCreateResponse>(
    PROMPT_END_POINT.CREATE,
  );
  return response.data;
};

export const useCreateChatRoom = () => {
  return useMutation({
    mutationKey: PROMPT_KEY.CREATE(),
    mutationFn: createChatRoom,
  });
};

/**
 * AI 채팅방 삭제
 * @param request 삭제할 채팅방 ID
 * @returns 삭제 결과
 */
const deleteChatRoom = async (
  request: PromptDeleteRequest,
): Promise<PromptDeleteResponse> => {
  const response = await api.delete<PromptDeleteResponse>(
    PROMPT_END_POINT.DELETE.replace(
      '{chatRoomId}',
      request.chatRoomId.toString(),
    ),
  );
  return response.data;
};

export const useDeleteChatRoom = () => {
  return useMutation({
    mutationKey: PROMPT_KEY.DELETE(),
    mutationFn: deleteChatRoom,
  });
};
