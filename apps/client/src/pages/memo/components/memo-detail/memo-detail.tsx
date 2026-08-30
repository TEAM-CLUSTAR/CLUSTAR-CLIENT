import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import TagPopover from '@features/tag-popover/tag-popover';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { MEMOS_KEY } from '@pages/memos/apis/query-key';

import { useFlatTags, useGetTag } from '@shared/apis/tag/queries';
import { MarkdownEditor } from '@shared/markdown-editor';
import { formatFullDate } from '@shared/utils/format-date';

import { toMemoDetail, useDeleteMemo, useGetMemo } from '../../apis/queries';
import { MEMO_KEY } from '../../apis/query-key';
import { useMemoAttachments } from '../../hooks/use-memo-attachments';
import { useMemoAutoSave } from '../../hooks/use-memo-auto-save';
import DeleteMemoModal from '../delete-memo-modal/delete-memo-modal';
import File from '../file/file';

import * as styles from './memo-detail.css';

export type MemoEditTarget =
  | { status: 'new'; memoId: number | null }
  | { status: 'saved'; memoId: number };

const UNSAVED_DATE_PLACEHOLDER = 'YYYY.MM.DD';

interface MemoDetailProps {
  memoId: number | null;
  onDeleteMemo: () => void;
  onTitleChange: (title: string) => void;
  defaultTagPopoverOpen?: boolean;
}

const MemoDetail = ({
  memoId,
  onDeleteMemo,
  onTitleChange,
  defaultTagPopoverOpen = false,
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

  const [isTagPopoverOpen, setIsTagPopoverOpen] = useState(
    defaultTagPopoverOpen,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { title, content, images, files, tagList } = memo;
  const deletableMemoId = target.status === 'saved' ? target.memoId : null;

  const { data: tagRoots = [] } = useGetTag();
  const { data: flatTags = [] } = useFlatTags();
  const [activeParentId, setActiveParentId] = useState<number>();

  const activeParent =
    tagRoots.find((root) => root.tagId === activeParentId) ?? tagRoots[0];

  const handleToggleTag = (tagId: number) => {
    const isSelected = tagList.some((tag) => tag.tagId === tagId);

    if (isSelected) {
      editMemo({ tagList: tagList.filter((tag) => tag.tagId !== tagId) });
      return;
    }

    const tagToAdd = flatTags.find((tag) => tag.tagId === tagId);
    if (!tagToAdd) {
      return;
    }
    editMemo({ tagList: [...tagList, tagToAdd] });
  };

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
              {activeParent && (
                <TagPopover
                  mode="browse"
                  selectedTags={tagList}
                  onRemoveTag={handleToggleTag}
                  isOpen={isTagPopoverOpen}
                  onFocus={() => setIsTagPopoverOpen(true)}
                  parentTags={tagRoots}
                  selectedParentId={activeParent.tagId}
                  onSelectParent={setActiveParentId}
                  tagTree={activeParent}
                  selectedIds={tagList.map((tag) => tag.tagId)}
                  onToggleTag={handleToggleTag}
                  onClose={() => setIsTagPopoverOpen(false)}
                />
              )}

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
