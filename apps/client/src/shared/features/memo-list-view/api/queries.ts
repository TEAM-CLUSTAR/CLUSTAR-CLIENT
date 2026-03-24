import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ALL_MEMO_KEY } from '@pages/all-memo/api/query-key';

import { api } from '@shared/api/instance';

import { AI_END_POINT } from './end-point';
import { PROMPT_END_POINT } from './end-point';
import { AI_KEY } from './query-key';
import { PROMPT_KEY } from './query-key';
import {
  AiCreateRequest,
  AiCreateResponse,
  AiSaveRequest,
  AiSaveResponse,
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

/**
 * AI 채팅 응답 생성
 * @param request 채팅 생성 요청 (chatRoomId와 body 포함)
 * @returns 생성된 AI 응답
 */
const createAiChat = async (
  request: AiCreateRequest,
): Promise<AiCreateResponse> => {
  const response = await api.post<AiCreateResponse>(
    AI_END_POINT.CREATE.replace('{chatRoomId}', request.chatRoomId.toString()),
    request.body,
  );
  return response.data;
};

export const useCreateAiChat = () => {
  return useMutation({
    mutationKey: AI_KEY.CREATE(),
    mutationFn: createAiChat,
  });
};

/**
 * AI가 만든 메모 저장
 * @param request 메모 저장 요청 (title, content, sourceMemoIds)
 * @returns 저장된 메모
 */
const saveAiMemo = async (request: AiSaveRequest): Promise<AiSaveResponse> => {
  const response = await api.post<AiSaveResponse>(AI_END_POINT.SAVE, request);
  return response.data;
};

export const useSaveAiMemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AI_KEY.SAVE(),
    mutationFn: saveAiMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_MEMO_KEY.ALL });
    },
  });
};
