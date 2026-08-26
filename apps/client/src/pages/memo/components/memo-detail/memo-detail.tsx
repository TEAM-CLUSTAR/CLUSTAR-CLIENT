import { ChangeEvent, useRef, useState } from 'react';
import TagInputField from '@features/tag-popover/tag-input-field/tag-input-field';

import { Icon } from '@cds/icon';
import { HoverTooltip } from '@cds/ui';

import { TagNode } from '@shared/apis/tag/type';
import { formatFullDate } from '@shared/utils/format-date';

import DeleteMemoModal from './components/delete-memo-modal/delete-memo-modal';
import File from './components/file/file';

import * as styles from './memo-detail.css';

interface MemoDetailProps {
  memoId: number;
  /** 메모 삭제 성공 시 호출돼요. 상위(탭)에서 닫기 등 후처리를 담당해요. */
  onDeleted?: () => void;
}

const MemoDetail = ({ memoId, onDeleted }: MemoDetailProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<TagNode[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // TODO: 태그 검색/추가 Popover가 아직 없어서 포커스만 열림 상태로 반영했어요.
  const [isTagFieldOpen, setIsTagFieldOpen] = useState(false);

  // TODO: 메모 상세 조회 API 연동이 다른 브랜치 작업으로 빠졌어요. 병합 후 실제 조회 데이터로 교체해주세요.
  const data = {
    title: '',
    content: '',
    images: [] as { imageId: number; imageUrl: string; imageName: string }[],
    files: [] as {
      fileId: number;
      fileUrl: string;
      fileName: string;
      fileSize: string;
    }[],
    updatedAt: '',
  };
  const { title, content, images, files, updatedAt } = data;

  const handleRemoveTag = (tagId: number) => {
    setTags((prev) => prev.filter((tag) => tag.tagId !== tagId));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) return;

    event.target.value = '';
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.bodyGroup}>
            <div className={styles.contentGroup}>
              <TagInputField
                selectedTags={tags}
                onRemoveTag={handleRemoveTag}
                isOpen={isTagFieldOpen}
                onFocus={() => setIsTagFieldOpen(true)}
              />

              {/* TODO: 최대 36자 입력 제한 */}
              <span className={styles.title}>{title}</span>
            </div>

            <p className={styles.content}>{content}</p>
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
                    alt={image.imageName}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <time className={styles.date}>{formatFullDate(updatedAt)}</time>

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
            accept="image/*,.pdf"
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

export default MemoDetail;
