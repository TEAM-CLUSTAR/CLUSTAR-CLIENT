import * as styles from './footer.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <button className={styles.text}>문의하기</button>
      <div className={styles.dot}>·</div>
      <button className={styles.text}>이용약관</button>
      <div className={styles.dot}>·</div>
      <button className={styles.text}>개인정보처리방침</button>
    </div>
  );
};

export default Footer;
