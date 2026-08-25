import { ComponentProps } from 'react';

import { Icon } from '@cds/icon';
import { Label, Title } from '@cds/ui';

import { components } from '@shared/types/schema';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './card.css';

export type CardInfoType = {
  title: string;
  content: string;
  createdAt: string;
  tagList?: components['schemas']['TagResponse'][];
  fileCount?: number;
  imageCount?: number;
  isNew?: boolean;
};

interface CardProps
  extends Omit<ComponentProps<'article'>, 'title' | 'content'>, CardInfoType {
  isSelected?: boolean;
  isDragging?: boolean;
}

const Card = ({
  title,
  content,
  createdAt,
  tagList = [],
  fileCount = 0,
  imageCount = 0,
  isNew = false,
  isSelected = false,
  isDragging = false,
  ...props
}: CardProps) => {
  return (
    <article
      {...props}
      className={styles.cardContainer({ isSelected, isDragging, isNew })}
      draggable
    >
      <div className={styles.mainInfoContainer}>
        <div className={styles.tagContainer}>
          {/* TODO: Label 리디자인 반영 후 수정 (현재는 임시 Label로 구현)*/}
          {tagList.length > 0 ? (
            tagList.map((tag) => (
              <Label
                key={tag.tagId}
                labelSize="sm"
                labelColor="blue"
                labelText={tag.name ?? ''}
              />
            ))
          ) : (
            <Label labelSize="sm" labelColor="grey" labelText="라벨없음" />
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

export default Card;
