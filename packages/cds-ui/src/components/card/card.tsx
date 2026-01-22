import { CSSProperties } from 'react';

import { Icon } from '@cds/icon';

import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
  PRIMARY_COLOR_VALUE_BY_LABEL_COLOR,
} from '../../constants/label-color-map';
import { themeVars } from '../../styles';
import LabelList from '../label-list/label-list';
import Title from '../title/title';

import * as styles from './card.css';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface CardProps {
  item: LabelItem[];
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  contents: string;
  fileCount: number;
  imageCount: number;
  date: string;
  isAiMode: boolean;
  isSelectedCard?: boolean;
  aiResult?: boolean;
  aiNewResult?: boolean;
  onClick?: () => void;
}

const Card = ({
  item,
  imageUrl,
  imageAlt,
  title,
  contents,
  fileCount,
  imageCount,
  date,
  isAiMode,
  isSelectedCard,
  aiResult,
  aiNewResult,
  onClick,
}: CardProps) => {
  const primaryLabelColor = item[0]
    ? LABEL_COLOR_BY_TEXT[item[0].text]
    : 'grey';
  const primaryColorValue =
    primaryLabelColor === 'grey'
      ? `${themeVars.color.grey600}`
      : PRIMARY_COLOR_VALUE_BY_LABEL_COLOR[primaryLabelColor];

  const isDefault = !isAiMode && !aiNewResult && !isSelectedCard;
  const isNewAiSelected = !!aiNewResult && isAiMode && !!isSelectedCard;

  return (
    <article
      className={styles.cardContainer({
        isDefault,
        aiNewResult,
        isAiMode,
        aiNewResultAndAiMode: aiNewResult && isAiMode,
        isSelectedCard: isSelectedCard && isAiMode,
        imageUrl: !!imageUrl,
        isClickable: !!onClick,
        aiNewResultAndAiModeAndSelected: isNewAiSelected,
      })}
      style={
        {
          [styles.PRIMARY_COLOR_VAR]: primaryColorValue,
        } as CSSProperties
      }
      onClick={onClick}
    >
      {imageUrl && (
        <div className={styles.imageContainer({ isAiMode })}>
          <img src={imageUrl} alt={imageAlt ?? ''} className={styles.image} />
        </div>
      )}

      <div className={styles.allContentsContainer}>
        <div>
          <div className={styles.labelListContainer}>
            <LabelList listType="card" labelItems={item} labelSize="sm" />
            {aiNewResult && <p className={styles.aiNewResult}>NEW</p>}
          </div>

          <div className={styles.textContent({ aiResult, aiNewResult })}>
            <div className={styles.titleContainer({ aiResult })}>
              {aiResult && (
                <Icon
                  name="ic_ai_gra"
                  width={36}
                  height={36}
                  className={styles.icon}
                />
              )}
              <Title title={title} />
            </div>
            <p className={styles.content}>{contents}</p>
          </div>
        </div>

        <div>
          <div className={styles.footerContenContainer}>
            <div className={styles.fileInfoContainer}>
              <div className={styles.fileInfo}>
                <Icon name="ic_file_24" width={24} height={24} />
                <span>{fileCount}</span>
              </div>
              <div className={styles.fileInfo}>
                <Icon name="ic_img_24" width={24} height={24} />
                <span>{imageCount}</span>
              </div>
            </div>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
