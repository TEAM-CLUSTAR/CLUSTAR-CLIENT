import { Outlet } from 'react-router';

import DashboardLayout from '@shared/components/layouts/dashboard-layout/dashboard-layout';

const DashboardRoute = () => {
  return (
    <DashboardLayout>
      {/* 추후 스켈레톤 suspense 추가
      <Suspense fallback={<DashboardSkeleton />}>
        <Outlet />
      </Suspense> */}
      <Outlet />
    </DashboardLayout>
  );
};

export default DashboardRoute;
