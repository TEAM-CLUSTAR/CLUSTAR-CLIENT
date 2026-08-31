import AuthLayout from '@layouts/auth-layout/auth-layout';
import { Outlet } from 'react-router';

const AuthRoute = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthRoute;
