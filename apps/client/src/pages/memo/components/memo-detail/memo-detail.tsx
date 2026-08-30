import { ReactNode, useRef, useState } from 'react';
import TagInputField from '@features/tag-popover/tag-input-field/tag-input-field';

import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { MarkdownEditor } from '@shared/markdown-editor';
import { formatFullDate } from '@shared/utils/format-date';

import DeleteMemoModal from '../delete-memo-modal/delete-memo-modal';
import File from '../file/file';

import * as styles from './memo-detail.css';

const getMemoDetail = (memoId: number | null): MemoDetailValue => {
  const currentDate = new Date().toISOString();

  return {
    memoId,
    title: '',
    content: '',
    images: [],
    files: [],
    tagList: [],
    createdAt: currentDate,
    updatedAt: currentDate,
    isAiGenerated: false,
    sourceMemoTitleList: [],
  };
};
export interface MemoDetailImage {
  imageId: number;
  imageUrl: string;
  imageName: string;
  imageExtension: string;
  imageSize: string;
}

export interface MemoDetailFile {
  fileId: number;
  fileUrl: string;
  fileName: string;
  fileExtension: string;
  fileSize: string;
}

export interface MemoDetailTag {
  tagId: number;
  name: string;
  color: string;
  parentId: number | null;
}

export interface MemoDetailValue {
  memoId: number | null;
  title: string;
  content: string;
  images: MemoDetailImage[];
  files: MemoDetailFile[];
  tagList: MemoDetailTag[];
  createdAt: string;
  updatedAt: string;
  isAiGenerated: boolean;
  sourceMemoTitleList: string[];
}

interface MemoDetailProps {
  memoId: number | null;
  onDeleted: () => void;
}

const MemoDetail = ({ memoId: selectedMemoId, onDeleted }: MemoDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: selectedMemoId가 있으면 상세 조회 API 결과로 memo를 초기화해요.
  const [memo, setMemo] = useState(getMemoDetail(selectedMemoId));

  // TODO: 자동 저장 API 작업에서 memo 변경을 debounce하여 저장해요.
  // TODO: 태그 검색/추가 Popover가 아직 없어서 포커스만 열림 상태로 반영했어요.
  const [isTagFieldOpen, setIsTagFieldOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { memoId, title, content, tagList, images, files, updatedAt } = memo;
  const currentDate = new Date().toISOString();
  const footerDate = memoId == null ? currentDate : updatedAt;

  const handleRemoveTag = () => {};
  const handleAttachClick = () => {};
  const handleFileChange = () => {};

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.bodyGroup}>
            <div className={styles.contentGroup}>
              <TagInputField
                selectedTags={tagList}
                onRemoveTag={handleRemoveTag}
                isOpen={isTagFieldOpen}
                onFocus={() => setIsTagFieldOpen(true)}
              />

              <input
                className={styles.title}
                value={title}
                maxLength={36}
                placeholder="제목을 입력해주세요."
                aria-label="메모 제목"
                onChange={(event) =>
                  setMemo((previousMemo) => ({
                    ...previousMemo,
                    title: event.target.value,
                  }))
                }
              />
            </div>
            <MarkdownEditor
              value={content}
              onChange={(markdown) =>
                setMemo((previousMemo) => ({
                  ...previousMemo,
                  content: markdown,
                }))
              }
            >
              <MarkdownEditor.Input
                className={styles.content}
                placeholder="내용을 입력해주세요."
              />
            </MarkdownEditor>
          </div>

          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file) => (
                <File key={file.fileId} file={file} />
              ))}
            </div>
          )}

          {images.length > 0 && (
            <div className={styles.imageGrid}>
              {images.map((image) => (
                // TODO: 이미지 개별 삭제 기능 추가
                <div key={image.imageId} className={styles.imageItem}>
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

        <div className={styles.footer}>
          <time className={styles.date}>{formatFullDate(footerDate)}</time>
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
        memoId={memoId}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDeleted={onDeleted}
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
