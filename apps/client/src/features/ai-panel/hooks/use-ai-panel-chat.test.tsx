import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const queryMocks = vi.hoisted(() => ({
  useCreateAiChat: vi.fn(),
  useCreateChatRoom: vi.fn(),
  useGetActiveChatRoom: vi.fn(),
  useGetRecommendedMemos: vi.fn(),
  useSaveAiMemo: vi.fn(),
}));

vi.mock('@shared/apis/prompt/queries', () => queryMocks);

import { useAiPanelChat } from './use-ai-panel-chat';

const setupMutationMocks = () => {
  queryMocks.useCreateChatRoom.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });
  queryMocks.useCreateAiChat.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });
  queryMocks.useSaveAiMemo.mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: false,
  });
};

describe('useAiPanelChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    queryMocks.useGetActiveChatRoom.mockReturnValue({
      data: undefined,
      isFetching: false,
    });
    queryMocks.useGetRecommendedMemos.mockReturnValue({
      data: undefined,
    });
    setupMutationMocks();
  });

  it('keeps loaded chat messages when the panel is closed', async () => {
    queryMocks.useGetActiveChatRoom.mockReturnValue({
      data: {
        data: {
          chatRoomId: 1,
          messages: [
            {
              messageId: 1,
              role: 'USER',
              status: 'SUCCESS',
              title: null,
              content: '이전 질문',
              option: 'MERGE',
              memoIds: [1],
              createdAt: '2026-08-30T10:00:00',
            },
          ],
        },
      },
      isFetching: false,
    });

    const { result, rerender } = renderHook(
      ({ isOpen }) => useAiPanelChat({ isOpen, selectedMemos: [] }),
      {
        initialProps: { isOpen: true },
      },
    );

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
    });

    rerender({ isOpen: false });

    expect(result.current.messages).toHaveLength(1);
  });

  it('keeps the first recommended memo list when selected memos change', async () => {
    queryMocks.useGetRecommendedMemos.mockImplementation(
      (memoIds: number[]) => ({
        data: {
          data: {
            results: memoIds.includes(1)
              ? [{ memoId: 10, title: '처음 추천 메모' }]
              : [{ memoId: 20, title: '바뀐 추천 메모' }],
          },
        },
      }),
    );

    const { result, rerender } = renderHook(
      ({ selectedMemos }) =>
        useAiPanelChat({
          isOpen: true,
          selectedMemos,
        }),
      {
        initialProps: {
          selectedMemos: [{ memoId: 1, title: '기준 메모' }],
        },
      },
    );

    await waitFor(() => {
      expect(result.current.recommendedMemos).toEqual([
        { memoId: 10, title: '처음 추천 메모', isSelected: false },
      ]);
    });

    rerender({
      selectedMemos: [
        { memoId: 2, title: '새 기준 메모' },
        { memoId: 10, title: '처음 추천 메모' },
      ],
    });

    expect(result.current.recommendedMemos).toEqual([
      { memoId: 10, title: '처음 추천 메모', isSelected: true },
    ]);
  });

  it('does not request recommended memos again after the first empty result', async () => {
    queryMocks.useGetRecommendedMemos.mockReturnValue({
      data: {
        data: {
          results: [],
        },
      },
    });

    const { rerender } = renderHook(
      ({ selectedMemos }) =>
        useAiPanelChat({
          isOpen: true,
          selectedMemos,
        }),
      {
        initialProps: {
          selectedMemos: [{ memoId: 1, title: '선택 메모' }],
        },
      },
    );

    await waitFor(() => {
      expect(queryMocks.useGetRecommendedMemos).toHaveBeenLastCalledWith(
        [1],
        false,
      );
    });

    rerender({
      selectedMemos: [{ memoId: 2, title: '새 선택 메모' }],
    });

    expect(queryMocks.useGetRecommendedMemos).toHaveBeenLastCalledWith(
      [2],
      false,
    );
  });

  it('requests recommended memos when selected memos exist even if the panel is closed', () => {
    renderHook(() =>
      useAiPanelChat({
        isOpen: false,
        selectedMemos: [{ memoId: 1, title: '선택 메모' }],
      }),
    );

    expect(queryMocks.useGetRecommendedMemos).toHaveBeenCalledWith([1], true);
  });

  it('hides recommended memos when no memo is selected', async () => {
    queryMocks.useGetRecommendedMemos.mockReturnValue({
      data: {
        data: {
          results: [{ memoId: 10, title: '추천 메모' }],
        },
      },
    });

    const { result, rerender } = renderHook(
      ({ selectedMemos }) =>
        useAiPanelChat({
          isOpen: true,
          selectedMemos,
        }),
      {
        initialProps: {
          selectedMemos: [{ memoId: 1, title: '선택 메모' }],
        },
      },
    );

    await waitFor(() => {
      expect(result.current.recommendedMemos).toHaveLength(1);
    });

    rerender({ selectedMemos: [] });

    expect(result.current.recommendedMemos).toEqual([]);
  });
});
