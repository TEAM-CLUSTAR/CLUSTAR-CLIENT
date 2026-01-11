import { Icon } from '@cds/icon';
import { SidebarPannel } from '@cds/ui';

const MemoPage = () => {
  return (
    <div>
      <Icon name="ic_ai_gra" />
      <SidebarPannel
        iconName="ic_newmemo"
        onClick={() => console.log('새 메모 클릭')}
      >
        새 메모
      </SidebarPannel>{' '}
    </div>
  );
};

export default MemoPage;
