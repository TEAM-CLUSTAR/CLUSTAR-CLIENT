import * as styles from './img-container.css';

interface ImgContainerProps {
  src: string;
  alt?: string;
}

const ImgContainer = ({ src, alt }: ImgContainerProps) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImgContainer;
