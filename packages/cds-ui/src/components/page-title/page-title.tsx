import * as styles from './page-title.css';

interface PageTitleProps {
  title: string;
  count: number;
}

const PageTitle = ({ title, count }: PageTitleProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.count}>{count}개</span>
    </div>
  );
};

export default PageTitle;
