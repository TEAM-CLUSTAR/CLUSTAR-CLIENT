import { useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';
import { LabelList } from '@cds/ui';

import { LabelTextType } from '@shared/types/label-type';

import * as styles from './label-select.css';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

const LabelSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dropdownItems: LabelItem[] = [
    { id: '1', text: '졸업 프로젝트' },
    { id: '2', text: 'SOPT' },
    { id: '2', text: '교양' },
    { id: '4', text: '레퍼런스' },
  ];

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
        className={styles.selectBox}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon name="ic_label" width={36} height={36} />
        <span className={styles.placeholder}>라벨을 선택하세요.</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <LabelList listType="card" labelItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default LabelSelect;
