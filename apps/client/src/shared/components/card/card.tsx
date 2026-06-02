import { Icon } from '@cds/icon';
import { Label, Title } from '@cds/ui';

import * as styles from './card.css';

// TODO: Tag 백엔드 타입에 맞게 변경
type TagType = {
  labelId: number;
  name: string;
};

type CardInfoType = {
  tagList: TagType[];
  title: string;
  content: string;
  fileCount: number;
  imageCount: number;
  date: string;
};
interface CardProps {
  card: CardInfoType;
  isSelected?: boolean;
  isDragging?: boolean;
  isAiResult?: boolean;
  handleCardClick: () => void;
}

const Card = ({
  card: { tagList, title, content, fileCount, imageCount, date },
  isSelected = false,
  isDragging = false,
  isAiResult = false,
  handleCardClick,
}: CardProps) => {
  return (
    <article
      className={styles.cardContainer({ isSelected, isDragging, isAiResult })}
      draggable
      onClick={handleCardClick}
    >
      <div className={styles.mainInfoContainer}>
        <div className={styles.tagContainer}>
          {/* TODO: Label 리디자인 반영 후 수정 (현재 임시 Label로 구현)*/}
          {tagList.length > 0 ? (
            tagList.map((tag) => (
              <Label
                key={tag.labelId}
                labelSize="sm"
                labelColor="blue"
                labelText={tag.name}
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
        <p>{date}</p>
      </div>
    </article>
  );
};

export default Card;
