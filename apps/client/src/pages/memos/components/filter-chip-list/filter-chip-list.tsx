import { Icon } from '@cds/icon';

import * as styles from './filter-chip-list.css';

type FilterChip = {
  id: number;
  tagName: string;
};

interface FilterChipListProps {
  chips: FilterChip[];
  onRemoveFilter: (id: number) => void;
}

const FilterChipList = ({ chips, onRemoveFilter }: FilterChipListProps) => {
  if (!chips.length) return null;

  return (
    <div className={styles.container}>
      {chips.map(({ id, tagName }) => (
        <div key={id} className={styles.chip}>
          <p className={styles.tagName}>{tagName}</p>
          <button
            type="button"
            onClick={() => onRemoveFilter(id)}
            aria-label={`${tagName} 필터 삭제`}
          >
            <Icon name="ic_delete" size={24} color="grey500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterChipList;
