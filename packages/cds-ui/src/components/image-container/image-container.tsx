import * as styles from './image-container.css';

interface ImgContainerProps {
  imageUrl: string;
  imageAlt: string;
}

const ImgContainer = ({ imageUrl, imageAlt }: ImgContainerProps) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={imageAlt} className={styles.img} />
    </div>
  );
};

export default ImgContainer;
