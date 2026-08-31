import MemoWorkspaceLayout from '@layouts/memo-workspace-layout/memo-workspace-layout';
import { Outlet } from 'react-router';

const MemoWorkspaceRoute = () => {
  return (
    <MemoWorkspaceLayout>
      <Outlet />
    </MemoWorkspaceLayout>
  );
};

export default MemoWorkspaceRoute;
