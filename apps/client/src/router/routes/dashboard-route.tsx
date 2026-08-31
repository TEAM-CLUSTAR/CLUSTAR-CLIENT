import DashboardLayout from '@layouts/dashboard-layout/dashboard-layout';
import { Outlet } from 'react-router';

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
