import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { getAccessToken } from '../storage/token-storage';
import { PATH } from './path';

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
