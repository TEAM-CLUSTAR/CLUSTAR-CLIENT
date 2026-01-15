import { useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';
import { Label, LabelList } from '@cds/ui';

import {
  LABEL_COLOR_BY_TEXT,
  LabelTextType,
} from '@entities/memo/models/constant';

import * as styles from './label-select.css';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface LabelSelectProps {
  onSelect: (items: LabelItem[]) => void;
}

const LabelSelect = ({ onSelect }: LabelSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<LabelItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const dropdownItems: LabelItem[] = [
    { id: '1', text: '졸업 프로젝트' },
    { id: '2', text: 'SOPT' },
    { id: '3', text: '교양' },
    { id: '4', text: '레퍼런스' },
    { id: '5', text: '태그없음' },
  ];

  const handleSelect = (item: LabelItem) => {
    const isAlreadySelected = selectedItems.some(
      (selected) => selected.id === item.id,
    );

    const newItems = isAlreadySelected
      ? selectedItems.filter((selected) => selected.id !== item.id)
      : [...selectedItems, item];

    setSelectedItems(newItems);
    onSelect(newItems);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.selectBox} ${isOpen ? styles.selectBoxOpen : ''}`}
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
                onClick={() => handleSelect(item)}
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
            labelItems={dropdownItems}
            onItemClick={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default LabelSelect;
