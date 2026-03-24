import { ReactNode } from 'react';
import { PATH } from '@router/path';
import { Navigate, useLocation } from 'react-router';

import { getAccessToken } from '@shared/storage/token-storage';

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to={PATH.LANDING} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
