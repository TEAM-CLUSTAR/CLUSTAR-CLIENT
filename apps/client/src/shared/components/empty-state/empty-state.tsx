import * as styles from './empty-state.css';

interface EmptyStateProps {
  imageSrc: string;
  title: string;
  description: string;
  imageAlt?: string;
}

const EmptyState = ({
  imageSrc,
  title,
  description,
  imageAlt = '',
}: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <img src={imageSrc} alt={imageAlt} className={styles.image} />
      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
