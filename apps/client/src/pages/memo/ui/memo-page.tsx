import { useState } from 'react';

import { Icon } from '@cds/icon';
import { SidebarIcon } from '@cds/ui';

const MemoPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <div>
      <Icon name="ic_ai_gra" />
      <SidebarIcon
        isSelected={isSelected}
        onClick={handleClick}
        icon={
          isSelected ? (
            <Icon name="ic_newmemo_blue" width={36} height={36} />
          ) : (
            <Icon name="ic_newmemo" width={36} height={36} />
          )
        }
      />
    </div>
  );
};

export default MemoPage;
