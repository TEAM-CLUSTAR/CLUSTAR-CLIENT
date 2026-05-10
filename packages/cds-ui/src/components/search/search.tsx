import { Icon } from '@cds/icon';

import * as styles from './search.css';

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <Icon name="ic_search" width={40} height={40} />
      <input
        className={styles.input}
        placeholder="메모를 검색하세요."
        aria-label="메모 검색"
      />
    </div>
  );
};

export default Search;
