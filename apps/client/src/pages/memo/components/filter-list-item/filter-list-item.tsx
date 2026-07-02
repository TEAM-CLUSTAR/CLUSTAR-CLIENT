import { Icon } from '@cds/icon';

import * as styles from './filter-list-item.css';

type RelationTypes = 'parent' | 'child' | 'descendant';

interface FilterListItemProps {
  relation: RelationTypes;
  tag: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const FilterListItem = ({
  relation,
  tag,
  checked,
  onChange,
}: FilterListItemProps) => {
  return (
    <label className={styles.container({ relation })}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Icon
        name={checked ? 'ic_checkbox_on' : 'ic_checkbox_off'}
        className={styles.icon}
        size={24}
        aria-hidden="true"
      />
      <span className={styles.tag}>{tag}</span>
    </label>
  );
};

export default FilterListItem;
