import { LabelList } from '@cds/ui';

import { LabelTextType } from '@shared/types/label-type';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

const item: LabelItem[] = [
  { id: '2', text: '교양' },
  { id: '3', text: 'SOPT' },
];

const AllMemoPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <LabelList
        listType="modal"
        labelItems={[]}
        dateText="2025.05.31. "
        labelSize="lg"
      />
      <LabelList
        listType="modal"
        labelItems={item}
        dateText="2025.05.31. "
        labelSize="lg"
      />
      <LabelList listType="card" labelItems={item} labelSize="sm" />
      <LabelList listType="card" labelItems={[]} labelSize="sm" />
    </div>
  );
};

export default AllMemoPage;
