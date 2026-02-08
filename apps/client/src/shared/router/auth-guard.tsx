import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { getAccessToken } from '../storage/token-storage';
import { PATH } from './path';

type GuardProps = {
  children: ReactNode;
};

/**
 * @description 인증된 사용자만 접근 가능한 페이지를 보호하는 가드
 */
export const PrivateRouteGuard = ({ children }: GuardProps) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to={PATH.LANDING} replace />;
  }

  return <>{children}</>;
};

/**
 * @description 인증된 사용자는 접근할 필요 없는 페이지를 처리하는 가드
 */
export const PublicRouteGuard = ({ children }: GuardProps) => {
  const accessToken = getAccessToken();
  const { pathname } = useLocation();

  const publicOnlyPaths: string[] = [
    PATH.LANDING,
    PATH.LOGIN,
    PATH.LOGIN_CALLBACK,
  ];

  if (accessToken && publicOnlyPaths.includes(pathname)) {
    return <Navigate to={PATH.ALL_MEMO} replace />;
  }

  return <>{children}</>;
};
