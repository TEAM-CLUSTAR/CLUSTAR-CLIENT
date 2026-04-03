import { useNavigate } from 'react-router';

import { Button } from '@cds/ui';

import * as styles from './empty-view.css';

interface EmptyViewProps {
  imgSrc?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonPath?: string;
}

const EmptyView = ({
  imgSrc,
  title,
  description,
  buttonText,
  buttonPath,
}: EmptyViewProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {imgSrc && (
        <img src={imgSrc} alt={`${title} 이미지`} className={styles.img} />
      )}
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.description}>{description}</p>

      {buttonText && buttonPath && (
        <div className={styles.buttonContainer}>
          <Button size="xl" onClick={() => navigate(buttonPath)}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyView;
