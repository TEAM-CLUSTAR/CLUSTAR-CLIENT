import { useState } from 'react';

import { Sidebar } from '@cds/ui';

const MemoPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState('new');

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Sidebar
      userId="test_user"
      userEmail="test@clustar.com"
      isExpanded={isExpanded}
      onToggle={handleToggle}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

export default MemoPage;
