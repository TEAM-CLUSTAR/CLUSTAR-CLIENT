import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { MEMOS_KEY } from '@pages/memos/apis/query-key';

import { api } from '../instance';
import { CHAT_ROOM_END_POINT } from './end-point';
import { AI_END_POINT } from './end-point';
import { CHAT_ROOM_KEY } from './query-key';
import { AI_KEY } from './query-key';
import {
  ActiveChatRoomResponse,
  AiCreateRequest,
  AiCreateResponse,
  AiSaveRequest,
  AiSaveResponse,
  ChatRoomCreateResponse,
  ChatRoomDeleteRequest,
  ChatRoomDeleteResponse,
  MemoRecommendationRequest,
  MemoRecommendationResponse,
} from './type';

/**
 * 활성 AI 채팅방 및 대화 조회
 * @returns 활성 채팅방 ID와 대화 목록
 */
const getActiveChatRoom = async (): Promise<ActiveChatRoomResponse> => {
  const response = await api.get<ActiveChatRoomResponse>(
    CHAT_ROOM_END_POINT.ACTIVE,
  );
  return response.data;
};

export const useGetActiveChatRoom = (enabled: boolean) => {
  return useQuery({
    queryKey: CHAT_ROOM_KEY.ACTIVE(),
    queryFn: getActiveChatRoom,
    enabled,
  });
};

/**
 * AI 채팅방 생성
 * @returns 생성된 채팅방 ID(chatRoomId)
 */
const createChatRoom = async (): Promise<ChatRoomCreateResponse> => {
  const response = await api.post<ChatRoomCreateResponse>(
    CHAT_ROOM_END_POINT.CREATE,
  );
  return response.data;
};

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CHAT_ROOM_KEY.CREATE(),
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_KEY.ACTIVE() });
    },
  });
};

/**
 * AI 채팅방 삭제
 * @param request 삭제할 채팅방 ID
 * @returns 삭제 결과
 */
const deleteChatRoom = async (
  request: ChatRoomDeleteRequest,
): Promise<ChatRoomDeleteResponse> => {
  const response = await api.delete<ChatRoomDeleteResponse>(
    CHAT_ROOM_END_POINT.DELETE.replace(
      '{chatRoomId}',
      request.chatRoomId.toString(),
    ),
  );
  return response.data;
};

export const useDeleteChatRoom = () => {
  return useMutation({
    mutationKey: CHAT_ROOM_KEY.DELETE(),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AI_KEY.CREATE(),
    mutationFn: createAiChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_KEY.ACTIVE() });
    },
  });
};

/**
 * 선택한 메모 기반 AI 추천 메모 조회
 * @param request 추천 기준 메모 ID 목록
 * @returns 추천 메모 목록
 */
const getRecommendedMemos = async (
  request: MemoRecommendationRequest,
): Promise<MemoRecommendationResponse> => {
  const response = await api.post<MemoRecommendationResponse>(
    AI_END_POINT.RECOMMENDATIONS,
    request,
  );
  return response.data;
};

export const useGetRecommendedMemos = (memoIds: number[], enabled: boolean) => {
  return useQuery({
    queryKey: AI_KEY.RECOMMENDATIONS(memoIds),
    queryFn: () => getRecommendedMemos({ memoIds }),
    enabled,
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
      queryClient.invalidateQueries({ queryKey: MEMOS_KEY.ALL });
    },
  });
};
