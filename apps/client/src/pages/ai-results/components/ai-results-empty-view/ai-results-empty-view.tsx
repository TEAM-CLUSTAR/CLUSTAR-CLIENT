import * as styles from './ai-results-empty-view.css';

const AiResultsEmptyView = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>저장된 AI 기록이 없습니다.</p>
      <p className={styles.description}>AI 기록을 생성해보세요.</p>
    </div>
  );
};

export default AiResultsEmptyView;
