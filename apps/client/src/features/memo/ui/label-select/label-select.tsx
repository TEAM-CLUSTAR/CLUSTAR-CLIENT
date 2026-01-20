import { FocusEvent, useState } from 'react';

import { Icon } from '@cds/icon';
import { Label, LabelList } from '@cds/ui';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';

import * as styles from './label-select.css';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface LabelSelectProps {
  selectedItems: LabelItem[];
  onSelect: (items: LabelItem[]) => void;
}

const dropdownItems: LabelItem[] = [
  { id: 'project', text: '졸업 프로젝트' },
  { id: 'general', text: '교양' },
  { id: 'sopt', text: 'SOPT' },
  { id: 'reference', text: '레퍼런스' },
];

const LabelSelect = ({ selectedItems, onSelect }: LabelSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleLabelChipClick = (item: LabelItem) => (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleSelect(item);
  };

  const handleSelect = (item: LabelItem) => {
    const isAlreadySelected = selectedItems.some(
      (select) => select.id === item.id,
    );
    const newItems = isAlreadySelected
      ? selectedItems.filter((select) => select.id !== item.id)
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
        <Icon name="ic_label" width={36} height={36} />

        {selectedItems.length > 0 ? (
          <div className={styles.chipContainer}>
            {selectedItems.map((item) => (
              <Label
                key={item.id}
                labelSize="lg"
                labelColor={LABEL_COLOR_BY_TEXT[item.text]}
                labelText={item.text}
                onClick={isOpen ? handleLabelChipClick(item) : undefined}
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
          <LabelList
            listType="card"
            labelSize="lg"
            labelItems={dropdownItems}
            onItemClick={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default LabelSelect;
