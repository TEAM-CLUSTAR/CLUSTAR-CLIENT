import { useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import LabelList, {
  ItemsType,
} from '../../../../../packages/cds-ui/src/components/label-list/label-list'; //@TODO 절대경로 수정

import * as styles from './label-select.css';

const DROPDOWN_ITEMS: ItemsType[] = [
  { id: 1, text: '졸업 프로젝트' },
  { id: 2, text: '교양' },
  { id: 3, text: 'SOPT' },
  { id: 4, text: '레퍼런스' },
];

const LabelSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className={styles.container}>
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
          <span className={styles.labelText}>라벨 선택</span>
          <LabelList listType="card" labelItems={DROPDOWN_ITEMS} />
        </div>
      )}
    </div>
  );
};

export default LabelSelect;
