import { Icon } from '@cds/icon';
import { SidebarPannel } from '@cds/ui';

const MemoPage = () => {
  return (
    <div>
      <Icon name="ic_ai_gra" />
      <SidebarPannel
        iconName="ic_newmemo"
        isSelected={false}
        onClick={() => {}}
      >
        새 메모
      </SidebarPannel>

      <SidebarPannel iconName="ic_newmemo" isSelected={true} onClick={() => {}}>
        새 메모
      </SidebarPannel>
    </div>
  );
};

export default MemoPage;
