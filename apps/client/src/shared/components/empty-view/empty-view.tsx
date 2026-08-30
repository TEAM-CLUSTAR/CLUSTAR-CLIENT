import * as styles from './empty-view.css';

interface EmptyViewProps {
  imgSrc?: string;
  title: string;
  description: string;
  buttonText?: string;
  fullHeight?: boolean;
  onButtonClick?: () => void;
}

const EmptyView = ({
  imgSrc,
  title,
  description,
  buttonText,
  fullHeight = false,
  onButtonClick,
}: EmptyViewProps) => {
  return (
    <div className={styles.container({ fullHeight })}>
      {imgSrc && <img src={imgSrc} alt="" className={styles.img} />}
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>

      {buttonText && onButtonClick && (
        <button type="button" className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyView;
