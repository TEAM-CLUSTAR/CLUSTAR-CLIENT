import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import TagInputField from '@features/tag-popover/tag-input-field/tag-input-field';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { MEMOS_KEY } from '@pages/memos/apis/query-key';

import { MarkdownEditor } from '@shared/markdown-editor';
import { formatFullDate } from '@shared/utils/format-date';

import { toMemoDetail, useDeleteMemo, useGetMemo } from '../../apis/queries';
import { MEMO_KEY } from '../../apis/query-key';
import DeleteMemoModal from '../delete-memo-modal/delete-memo-modal';
import File from '../file/file';
import { useMemoAttachments } from './use-memo-attachments';
import { useMemoAutoSave } from './use-memo-auto-save';

import * as styles from './memo-detail.css';

export type MemoEditTarget =
  | { status: 'new'; memoId: number | null }
  | { status: 'saved'; memoId: number };

const UNSAVED_DATE_PLACEHOLDER = 'YYYY.MM.DD';

interface MemoDetailProps {
  memoId: number | null;
  onDeleteMemo: () => void;
  onTitleChange: (title: string) => void;
}

const MemoDetail = ({
  memoId,
  onDeleteMemo,
  onTitleChange,
}: MemoDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const initialTarget: MemoEditTarget =
    memoId === null
      ? { status: 'new', memoId: null }
      : { status: 'saved', memoId };

  const { data: memoData } = useQuery({
    ...useGetMemo(memoId),
    select: toMemoDetail,
  });

  const { memo, target, lastSavedDate, editMemo } = useMemoAutoSave({
    initialTarget,
    savedMemo: memoData,
  });

  const { attachFiles } = useMemoAttachments();

  const { mutate: deleteMemo } = useMutation({
    ...useDeleteMemo(),
    onSuccess: (_, deletedMemoId) => {
      queryClient.invalidateQueries({ queryKey: MEMOS_KEY.ALL });
      queryClient.removeQueries({ queryKey: MEMO_KEY.GET(deletedMemoId) });
    },
  });

  // TODO: 태그 검색/추가 Popover가 아직 없어서 포커스만 열림 상태로 반영했어요.
  const [isTagFieldOpen, setIsTagFieldOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { title, content, tagList, images, files } = memo;
  const deletableMemoId = target.status === 'saved' ? target.memoId : null;

  const handleRemoveTag = () => {};

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTitle = event.target.value;

    editMemo({ title: nextTitle });
    onTitleChange(nextTitle);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (selectedFiles.length === 0) {
      return;
    }

    attachFiles(
      { selectedFiles, currentImages: images, currentFiles: files },
      {
        onSuccess: (attached) => {
          editMemo({
            images: [...images, ...attached.images],
            files: [...files, ...attached.files],
          });
        },
      },
    );
  };
  const handleConfirmDelete = () => {
    if (deletableMemoId !== null) {
      deleteMemo(deletableMemoId);
    }

    onDeleteMemo();
  };

  // 기존 메모를 다 받아오기 전에 편집하지 못하도록 가드.
  // TODO: 디자인이 나오면 스켈레톤으로 교체.
  if (memoId !== null && memoData === undefined) {
    return <div className={styles.root} aria-busy="true" />;
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.bodyGroup}>
            <div className={styles.contentGroup}>
              {/* 태그 선택 섹션 */}
              <TagInputField
                selectedTags={tagList}
                onRemoveTag={handleRemoveTag}
                isOpen={isTagFieldOpen}
                onFocus={() => setIsTagFieldOpen(true)}
              />

              {/* 제목 섹션 */}
              <input
                className={styles.title}
                value={title}
                maxLength={36}
                placeholder="제목을 입력해주세요."
                aria-label="메모 제목"
                onChange={handleTitleChange}
              />
            </div>

            {/* 마크다운 본문 섹션 */}
            <MarkdownEditor
              value={content}
              onChange={(markdown) => editMemo({ content: markdown })}
            >
              <MarkdownEditor.Input
                className={styles.content}
                placeholder="내용을 입력해주세요."
              />
            </MarkdownEditor>
          </div>

          {/* 파일 섹션 */}
          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file) => (
                <File
                  key={file.status === 'saved' ? file.fileId : file.s3Key}
                  file={file}
                />
              ))}
            </div>
          )}

          {/* 이미지 섹션 */}
          {images.length > 0 && (
            <div className={styles.imageGrid}>
              {images.map((image) => (
                // TODO: 이미지 개별 삭제 기능 추가
                <div
                  key={image.status === 'saved' ? image.imageId : image.s3Key}
                  className={styles.imageItem}
                >
                  <img
                    className={styles.image}
                    src={image.imageUrl}
                    alt={image.imageName ?? ''}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer 섹션 */}
        <div className={styles.footer}>
          <time className={styles.date}>
            {lastSavedDate === null
              ? UNSAVED_DATE_PLACEHOLDER
              : formatFullDate(lastSavedDate)}
          </time>
          <Divider />

          <div className={styles.count}>
            <Icon name="ic_file" size={32} color="grey700" />
            <span>{files.length}</span>
          </div>
          <div className={styles.count}>
            <Icon name="ic_img" size={32} color="grey700" />
            <span>{images.length}</span>
          </div>

          <Divider />

          <HoverTooltip title="사진 및 파일 업로드">
            <button
              className={styles.iconButton}
              type="button"
              onClick={handleAttachClick}
            >
              <Icon name="ic_plus" size={24} color="grey700" />
            </button>
          </HoverTooltip>
          <input
            ref={fileInputRef}
            className={styles.hiddenInput}
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <Divider />

          <HoverTooltip title="메모 삭제하기">
            <button
              className={styles.iconButton}
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Icon name="ic_trash" size={24} color="grey700" />
            </button>
          </HoverTooltip>
        </div>
      </div>

      <DeleteMemoModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDeleted={handleConfirmDelete}
      />
    </>
  );
};

const Divider = () => <span className={styles.divider} />;

interface HoverTooltipProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const HoverTooltip = ({ title, description, children }: HoverTooltipProps) => {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <div className={styles.tooltipBubble}>
        <Tooltip title={title} description={description} />
      </div>
    </div>
  );
};

export default MemoDetail;
