import { ComponentProps } from 'react';

import { Icon } from '@cds/icon';
import { Tag, Title } from '@cds/ui';

import { components } from '@shared/types/schema';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './memo-card.css';

export type MemoCardInfoType = {
  memoId: number;
  title: string;
  content: string;
  createdAt: string;
  tagList: components['schemas']['TagResponse'][];
  fileCount: number;
  imageCount: number;
  isAiGenerated: boolean;
  isNew: boolean;
};

interface MemoCardProps
  extends
    Omit<ComponentProps<'article'>, 'title' | 'content'>,
    MemoCardInfoType {
  isSelected?: boolean;
  isDragging?: boolean;
  onSelectTag?: (memoId: number) => void;
}

const MemoCard = ({
  memoId,
  title,
  content,
  createdAt,
  tagList = [],
  fileCount = 0,
  imageCount = 0,
  isAiGenerated = false,
  isNew = false,
  isSelected = false,
  isDragging = false,
  onSelectTag,
  ...props
}: MemoCardProps) => {
  return (
    <article
      {...props}
      className={styles.cardContainer({ isSelected, isDragging, isNew })}
    >
      <div className={styles.mainInfoContainer}>
        <div className={styles.tagContainer}>
          {isAiGenerated && (
            <Tag size="lg" variant="outlined" text="AI 결과물" />
          )}
          {tagList.length === 0 ? (
            <button
              type="button"
              className={styles.tagSelectButton}
              onClick={(event) => {
                event.stopPropagation();
                onSelectTag?.(memoId);
              }}
            >
              <Icon name="ic_plus" size={16} color="grey500" />
              <span className={styles.tagSelectButtonText}>태그 선택</span>
            </button>
          ) : (
            tagList.map((tag) => (
              <Tag
                key={tag.tagId}
                size="lg"
                color={tag.color ?? ''}
                text={tag.name ?? ''}
              />
            ))
          )}
        </div>
        <div className={styles.contentsContainer}>
          <Title title={title} />
          <p className={styles.content}>{content}</p>
        </div>
      </div>
      <div className={styles.subInfoContainer}>
        <div className={styles.countContainer}>
          <div className={styles.count}>
            <Icon name="ic_file" size={28} color="grey500" />
            <span>{fileCount}</span>
          </div>
          <div className={styles.count}>
            <Icon name="ic_img" size={28} color="grey500" />
            <span>{imageCount}</span>
          </div>
        </div>
        <time>{formatDate(createdAt)}</time>
      </div>
    </article>
  );
};

export default MemoCard;
