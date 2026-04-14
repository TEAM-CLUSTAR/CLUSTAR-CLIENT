import { Button } from '@cds/ui';

import * as styles from './empty-view.css';

interface EmptyViewProps {
  imgSrc?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyView = ({
  imgSrc,
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyViewProps) => {
  return (
    <div className={styles.container}>
      {imgSrc && (
        <img src={imgSrc} alt={'empty 이미지'} className={styles.img} />
      )}
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>

      {buttonText && onButtonClick && (
        <div className={styles.buttonContainer}>
          <Button size="xl" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyView;
