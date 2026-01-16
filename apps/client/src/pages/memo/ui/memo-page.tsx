// src/features/memo/ui/MemoEditor.tsx (예시)
import { useState } from 'react';

import { LabelTextType } from '@entities/memo/models/constant';

import LabelSelect from '../../../features/memo/label-select/label-select'; // 경로에 맞춰 수정
interface LabelItem {
  id: string;
  text: LabelTextType;
}

const MemoPage = () => {
  const [selectedLabels, setSelectedLabels] = useState<LabelItem[]>([]);

  return (
    <main>
      {/* 다른 메모 입력 요소들... */}
      <LabelSelect
        selectedItems={selectedLabels}
        onSelect={setSelectedLabels}
      />
    </main>
  );
};
export default MemoPage;
