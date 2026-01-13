import * as styles from './title.css';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <h2 className={styles.titleText}>{title}</h2>;
};

export default Title;
