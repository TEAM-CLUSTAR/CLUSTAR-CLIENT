import { Outlet } from 'react-router';

import AuthLayout from '@shared/components/layouts/auth-layout/auth-layout';

const AuthRoute = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthRoute;
