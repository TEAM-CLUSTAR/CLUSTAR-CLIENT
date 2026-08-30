import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MemoType } from '@pages/memo/types/memo-type';
import { MEMOS_KEY } from '@pages/memos/apis/query-key';

import {
  toMemoDetail,
  useGetMemo as memoDetailQuery,
  usePatchMemo,
  usePostMemo,
} from '../../apis/queries';
import { MEMO_KEY } from '../../apis/query-key';
import { PatchMemoRequestBody, PostMemoRequestBody } from '../../apis/type';
import type { MemoEditTarget } from './memo-detail';

const AUTO_SAVE_DELAY_MS = 1000;

/** 저장을 직렬로 실행해요. 생성 응답의 memoId를 다음 저장이 써야 하거든요. */
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

/** 저장이 실제로 일어나지 않았으면 null. (제목·본문이 비어 아직 만들 수 없는 새 메모) */
type SaveResult = {
  savedMemoId: number;
  lastSavedDate: string;
  savedAttachments: Pick<MemoType, 'images' | 'files'> | null;
} | null;

const toMemoBody = (memo: MemoType) => ({
  title: memo.title,
  content: memo.content,
  tagNames: memo.tagList.map((tag) => tag.name),
});

const toCreateRequest = (memo: MemoType): PostMemoRequestBody => ({
  ...toMemoBody(memo),
  images: memo.images.flatMap((image, index) =>
    image.status === 'uploaded'
      ? [{ s3Key: image.s3Key, imageName: image.imageName, priority: index }]
      : [],
  ),
  files: memo.files.flatMap((file, index) =>
    file.status === 'uploaded'
      ? [{ s3Key: file.s3Key, fileName: file.fileName, priority: index }]
      : [],
  ),
});

/**
 * 이미 저장된 첨부는 id만 보내 유지하고, 새로 올린 첨부는 s3Key와 원본 파일명만 보냄.
 */
const toUpdateRequest = (memo: MemoType): PatchMemoRequestBody => ({
  ...toMemoBody(memo),
  images: memo.images.map((image, index) =>
    image.status === 'saved'
      ? { imageId: image.imageId, priority: index }
      : { s3Key: image.s3Key, imageName: image.imageName, priority: index },
  ),
  files: memo.files.map((file, index) =>
    file.status === 'saved'
      ? { fileId: file.fileId, priority: index }
      : { s3Key: file.s3Key, fileName: file.fileName, priority: index },
  ),
});

/** 아직 저장된 적 없는 첨부가 있으면, 저장 후에 서버가 준 id로 바꿈 */
const hasUploadedAttachment = (memo: MemoType) =>
  memo.images.some((image) => image.status === 'uploaded') ||
  memo.files.some((file) => file.status === 'uploaded');

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

  /**
   * 저장 직후 상세를 다시 받아 저장된 첨부로 바꿔요.
   */
  const readSavedAttachments = async (
    memoToSave: MemoType,
    savedMemoId: number,
  ) => {
    if (!hasUploadedAttachment(memoToSave)) {
      return null;
    }

    const savedDetail = toMemoDetail(
      await queryClient.fetchQuery({
        ...memoDetailQuery(savedMemoId),
        // 방금 저장해서 캐시가 남아 있어도 반드시 새로 받아야 해요.
        staleTime: 0,
      }),
    );

    return { images: savedDetail.images, files: savedDetail.files };
  };

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

        return {
          savedMemoId: currentMemoId,
          lastSavedDate: updatedMemo.updatedAt,
          savedAttachments: await readSavedAttachments(
            memoToSave,
            currentMemoId,
          ),
        };
      }

      if (memoToSave.title === '' || memoToSave.content === '') {
        return null;
      }

      const createdMemo = readSavedMemo(
        await postMemo.mutateAsync(toCreateRequest(memoToSave)),
      );

      savedMemoIdRef.current = createdMemo.memoId;

      return {
        savedMemoId: createdMemo.memoId,
        lastSavedDate: createdMemo.createdAt,
        savedAttachments: await readSavedAttachments(
          memoToSave,
          createdMemo.memoId,
        ),
      };
    },
    onSuccess: (result) => {
      if (result === null) {
        return;
      }

      if (result.savedAttachments !== null) {
        setDraft((previousDraft) =>
          previousDraft === null
            ? previousDraft
            : { ...previousDraft, ...result.savedAttachments },
        );
      }

      queryClient.invalidateQueries({
        queryKey: MEMOS_KEY.ALL,
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: MEMO_KEY.GET(result.savedMemoId),
        refetchType: 'none',
      });
    },
  });

  const memo = draft ?? savedMemo ?? EMPTY_MEMO;

  const savedMemoId = saveMemo.data?.savedMemoId ?? initialSavedMemoId;
  const target: MemoEditTarget =
    savedMemoId === null
      ? { status: 'new', memoId: null }
      : { status: 'saved', memoId: savedMemoId };

  const lastSavedDate =
    saveMemo.data?.lastSavedDate ?? savedMemo?.updatedAt ?? null;

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
    lastSavedDate,
    editMemo,
    saveError: saveMemo.error,
  };
};
