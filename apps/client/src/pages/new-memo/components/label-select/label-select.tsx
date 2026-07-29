import { FocusEvent, useState } from 'react';

import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { components } from '@shared/types/schema';

import * as styles from './label-select.css';

type TagItem = components['schemas']['TagResponse'];

interface LabelSelectProps {
  selectedItems: TagItem[];
  onSelect: (items: TagItem[]) => void;
}

const LabelSelect = ({ selectedItems, onSelect }: LabelSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: TagItem) => {
    const isAlreadySelected = selectedItems.some(
      (select) => select.tagId === item.tagId,
    );
    const newItems = isAlreadySelected
      ? selectedItems.filter((select) => select.tagId !== item.tagId)
      : [...selectedItems, item];

    onSelect(newItems);
  };

  return (
    <div className={styles.container} onBlur={handleBlur} tabIndex={-1}>
      <button
        type="button"
        className={styles.selectBox({ isOpen: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="ic_label" size={36} />

        {selectedItems.length > 0 ? (
          <div className={styles.chipContainer}>
            {selectedItems.map((item) => (
              <Tag
                key={item.tagId}
                size="lg"
                color={item.colorHex ?? ''}
                text={item.name ?? ''}
                onRemove={isOpen ? () => handleSelect(item) : undefined}
              />
            ))}
          </div>
        ) : (
          <span className={styles.placeholder}>라벨을 선택하세요.</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <span className={styles.labelText}>라벨 선택</span>
        </div>
      )}
    </div>
  );
};

export default LabelSelect;
