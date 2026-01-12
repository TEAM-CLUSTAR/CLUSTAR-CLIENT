import { useState } from 'react';

import { Icon } from '@cds/icon';
import { SidebarPannel } from '@cds/ui';

const MemoPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <div>
      <Icon name="ic_ai_gra" />
      <SidebarPannel
        isSelected={isSelected}
        onClick={handleClick}
        icon={
          isSelected ? (
            <Icon name="ic_newmemo_blue" width={36} height={36} />
          ) : (
            <Icon name="ic_newmemo" width={36} height={36} />
          )
        }
      >
        새 메모
      </SidebarPannel>
    </div>
  );
};

export default MemoPage;
