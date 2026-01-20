import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { PATH } from '@shared/router/path';
import { getAccessToken } from '@shared/storage/token-storage';

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  if (code) {
    return <Navigate to={`${PATH.LOGIN_CALLBACK}${location.search}`} replace />;
  }

  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
