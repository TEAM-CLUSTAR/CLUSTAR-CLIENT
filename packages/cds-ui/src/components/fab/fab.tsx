import { Icon } from '@cds/icon';

import * as styles from './fab.css';

interface FabProps {
  isActive: boolean;
  onClick: () => void;
}

const Fab = ({ isActive, onClick }: FabProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button({ mode: isActive ? 'active' : 'default' })}
    >
      <Icon name="ic_ai_white" size={36} />
      <span>{isActive ? '정리 진행하기' : 'AI로 정리하기'}</span>
    </button>
  );
};

export default Fab;
