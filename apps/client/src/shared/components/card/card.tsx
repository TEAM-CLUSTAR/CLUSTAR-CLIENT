import { ComponentProps } from 'react';

import { Icon } from '@cds/icon';
import { Tag, Title } from '@cds/ui';

import { formatDate } from '@shared/utils/format-date';

import * as styles from './card.css';

// TODO: Tag 백엔드 타입에 맞게 변경
type TagType = {
  tagId?: number;
  name?: string;
};

type CardInfoType = {
  tagList?: TagType[];
  title: string;
  content: string;
  fileCount: number;
  imageCount: number;
  createAt: string;
};
interface CardProps extends ComponentProps<'article'> {
  card: CardInfoType;
  isSelected?: boolean;
  isDragging?: boolean;
  isNewAi?: boolean;
}

const Card = ({
  card: { tagList = [], title, content, fileCount, imageCount, createAt },
  isSelected = false,
  isDragging = false,
  isNewAi = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.cardContainer({ isSelected, isDragging, isNewAi })}
      draggable
      {...props}
    >
      <div className={styles.mainInfoContainer}>
        <div className={styles.tagContainer}>
          {tagList.map((tag) => (
            <Tag
              key={tag.tagId}
              size="sm"
              color="blue"
              text={tag.name ?? ''}
            />
          ))}
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
        <time>{formatDate(createAt)}</time>
      </div>
    </article>
  );
};

export default Card;
