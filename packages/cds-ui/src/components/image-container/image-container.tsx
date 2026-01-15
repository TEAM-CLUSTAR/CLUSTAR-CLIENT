import * as styles from './image-container.css';

export interface ImageContainerProps {
  imageUrl: string;
  imageAlt: string;
}

const ImageContainer = ({ imageUrl, imageAlt }: ImageContainerProps) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={imageAlt} className={styles.img} />
    </div>
  );
};

export default ImageContainer;
