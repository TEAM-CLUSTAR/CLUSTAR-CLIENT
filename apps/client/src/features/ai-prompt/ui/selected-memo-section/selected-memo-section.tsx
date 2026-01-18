import { SelectedMemo } from '@cds/ui';

import * as styles from './selected-memo-section.css';

export interface SelectedMemoItemType {
  id: string;
  title: string;
}

interface SelectedMemosListProps {
  selectedMemos: SelectedMemoItemType[];
}

const SelectedMemosList = ({ selectedMemos }: SelectedMemosListProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>선택된 메모 ({selectedMemos.length})</span>
      <div className={styles.memoContainer}>
        {selectedMemos.map((memo) => (
          <SelectedMemo key={memo.id} memoName={memo.title} />
        ))}
      </div>
    </div>
  );
};

export default SelectedMemosList;
