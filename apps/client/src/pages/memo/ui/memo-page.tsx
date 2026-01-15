import { useState } from 'react';

import InputTitle from '@features/memo/input-title/input-title';

const MemoPage = () => {
  const [title, setTitle] = useState('');
  return (
    <div>
      <InputTitle title={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
  );
};

export default MemoPage;
