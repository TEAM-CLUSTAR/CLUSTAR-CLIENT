import { ComponentProps } from 'react';

import { Icon } from '@cds/icon';
import { Tag, Title } from '@cds/ui';

import { components } from '@shared/types/schema';
import { formatDate } from '@shared/utils/format-date';

import * as styles from './card.css';

type CardInfoType = {
  tagList?: components['schemas']['TagResponse'][];
  title: string;
  content: string;
  fileCount: number;
  imageCount: number;
  createAt: string;
  isAiGenerated?: boolean;
};
interface CardProps extends ComponentProps<'article'> {
  card: CardInfoType;
  isSelected?: boolean;
  isDragging?: boolean;
}

const Card = ({
  card: {
    tagList = [],
    title,
    content,
    fileCount,
    imageCount,
    createAt,
    isAiGenerated = false,
  },
  isSelected = false,
  isDragging = false,
  ...props
}: CardProps) => {
  return (
    <article
      className={styles.cardContainer({
        isSelected,
        isDragging,
        isAiGenerated,
      })}
      draggable
      {...props}
    >
      <div className={styles.mainInfoContainer}>
        <div className={styles.tagContainer}>
          {isAiGenerated && (
            <Tag size="lg" variant="outlined" text="AI 결과물" />
          )}
          {tagList.map((tag) => (
            <Tag
              key={tag.tagId}
              size="lg"
              color={tag.color ?? ''}
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
