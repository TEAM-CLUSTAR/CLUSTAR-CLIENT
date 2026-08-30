import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MemoType } from '@pages/memo/types/memo-type';
import { MEMOS_KEY } from '@pages/memos/apis/query-key';

import { usePatchMemo, usePostMemo } from '../../apis/queries';
import { MEMO_KEY } from '../../apis/query-key';
import {
  PatchMemoRequestBody,
  PostMemoRequestBody,
  PostMemoResponse,
} from '../../apis/type';
import type { MemoEditTarget } from './memo-detail';

const AUTO_SAVE_DELAY_MS = 1000;

const AUTO_SAVE_SCOPE = { id: 'memo-auto-save' };

const EMPTY_MEMO: MemoType = {
  memoId: null,
  title: '',
  content: '',
  images: [],
  files: [],
  tagList: [],
  createdAt: '',
  updatedAt: '',
  isAiGenerated: false,
  sourceMemoTitleList: [],
};

interface UseMemoAutoSaveParams {
  initialTarget: MemoEditTarget;
  savedMemo: MemoType | undefined;
}

type SaveResult = {
  savedMemo: NonNullable<PostMemoResponse['data']>;
  isCreated: boolean;
} | null;

/**
 * 첨부 업로드(presigned URL)가 아직 없어서 새 메모는 첨부 없이 생성돼요.
 */
const toCreateRequest = (memo: MemoType): PostMemoRequestBody => ({
  title: memo.title,
  content: memo.content,
  tagNames: memo.tagList.map((tag) => tag.name),
});

const toUpdateRequest = (memo: MemoType): PatchMemoRequestBody => ({
  title: memo.title,
  content: memo.content,
  tagNames: memo.tagList.map((tag) => tag.name),
  images: memo.images.map((image, index) => ({
    imageId: image.imageId,
    priority: index,
  })),
  files: memo.files.map((file, index) => ({
    fileId: file.fileId,
    priority: index,
  })),
});

const readSavedMemo = <TSavedMemo>(response: { data?: TSavedMemo }) => {
  if (response.data === undefined) {
    throw new Error('메모 저장 응답에 data가 없어요.');
  }

  return response.data;
};

export const useMemoAutoSave = ({
  initialTarget,
  savedMemo,
}: UseMemoAutoSaveParams) => {
  const queryClient = useQueryClient();
  const postMemo = useMutation(usePostMemo());
  const patchMemo = useMutation(usePatchMemo());

  const [draft, setDraft] = useState<MemoType | null>(null);

  const initialSavedMemoId = initialTarget.memoId;

  const savedMemoIdRef = useRef(initialSavedMemoId);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSaveRef = useRef<(() => void) | null>(null);

  const saveMemo = useMutation({
    scope: AUTO_SAVE_SCOPE,
    mutationFn: async (memoToSave: MemoType): Promise<SaveResult> => {
      const currentMemoId = savedMemoIdRef.current;

      if (currentMemoId !== null) {
        const updatedMemo = readSavedMemo(
          await patchMemo.mutateAsync({
            memoId: currentMemoId,
            body: toUpdateRequest(memoToSave),
          }),
        );

        return { savedMemo: updatedMemo, isCreated: false };
      }

      if (memoToSave.title === '' || memoToSave.content === '') {
        return null;
      }

      const createdMemo = readSavedMemo(
        await postMemo.mutateAsync(toCreateRequest(memoToSave)),
      );

      savedMemoIdRef.current = createdMemo.memoId;

      return { savedMemo: createdMemo, isCreated: true };
    },
    onSuccess: (result) => {
      if (result === null) {
        return;
      }

      // 자동저장은 1초마다 일어날 수 있어서, 열려 있는 화면을 매번 다시 요청하지 않고
      // stale 표시만 남김. 목록은 다음 진입 때 새로 받아옴.
      queryClient.invalidateQueries({
        queryKey: MEMOS_KEY.ALL,
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: MEMO_KEY.GET(result.savedMemo.memoId),
        refetchType: 'none',
      });
    },
  });

  const memo = draft ?? savedMemo ?? EMPTY_MEMO;

  // 저장 결과는 뮤테이션이 들고 있어서 따로 복사해두지 않기
  const lastSaveResult = saveMemo.data ?? null;
  const savedMemoId = lastSaveResult?.savedMemo.memoId ?? initialSavedMemoId;
  const target: MemoEditTarget =
    savedMemoId === null
      ? { status: 'new', memoId: null }
      : { status: 'saved', memoId: savedMemoId };

  const getLastSavedDate = () => {
    if (lastSaveResult === null) {
      return savedMemo?.updatedAt ?? null;
    }

    return lastSaveResult.isCreated
      ? lastSaveResult.savedMemo.createdAt
      : lastSaveResult.savedMemo.updatedAt;
  };

  const scheduleAutoSave = (nextMemo: MemoType) => {
    if (saveTimerRef.current !== null) {
      clearTimeout(saveTimerRef.current);
    }

    const runScheduledSave = () => {
      saveTimerRef.current = null;
      pendingSaveRef.current = null;
      saveMemo.mutate(nextMemo);
    };

    pendingSaveRef.current = runScheduledSave;
    saveTimerRef.current = setTimeout(runScheduledSave, AUTO_SAVE_DELAY_MS);
  };

  const editMemo = (changes: Partial<MemoType>) => {
    const nextMemo = { ...memo, ...changes };

    setDraft(nextMemo);
    scheduleAutoSave(nextMemo);
  };

  useEffect(() => {
    // 아직 저장되지 않은 입력이 남아 있으면 화면을 떠나기 전에 즉시 저장
    return () => {
      if (saveTimerRef.current !== null) {
        clearTimeout(saveTimerRef.current);
      }

      pendingSaveRef.current?.();
    };
  }, []);

  return {
    memo,
    target,
    lastSavedDate: getLastSavedDate(),
    editMemo,
    isSaving: saveMemo.isPending,
    saveError: saveMemo.error,
  };
};
