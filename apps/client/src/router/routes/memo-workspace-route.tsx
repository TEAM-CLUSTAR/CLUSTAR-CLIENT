import { Outlet } from 'react-router';

import MemoWorkspaceLayout from '@shared/components/layouts/memo-workspace-layout/memo-workspace-layout';

const MemoWorkspaceRoute = () => {
  return (
    <MemoWorkspaceLayout>
      <Outlet />
    </MemoWorkspaceLayout>
  );
};

export default MemoWorkspaceRoute;
