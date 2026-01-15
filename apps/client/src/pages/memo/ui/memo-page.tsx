import { ComponentProps, useState } from 'react';

import { LabelList } from '@cds/ui';

import LabelSelect from '../../../features/memo/label-select/label-select';

type LabelItem = ComponentProps<typeof LabelList>['labelItems'][number];

const MemoPage = () => {
  const [selectedLabels, setSelectedLabels] = useState<LabelItem[]>([]);

  const handleLabelChange = (items: LabelItem[]) => {
    setSelectedLabels(items);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>메모 작성</h2>

      <LabelSelect onSelect={handleLabelChange} />

      <div style={{ marginTop: '16px' }}>
        선택된 라벨 개수: {selectedLabels.length}개
      </div>
    </div>
  );
};

export default MemoPage;
