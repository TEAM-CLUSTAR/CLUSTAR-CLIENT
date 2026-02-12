import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { getAccessToken } from '../storage/token-storage';
import { GUEST_ONLY_PATHS, PATH } from './path';

type GuardProps = {
  requireAuth?: boolean;
  children: ReactNode;
};

/**
 * @description 라우트 가드
 * - requireAuth: 인증이 필요한 라우트 (인증 없으면 랜딩으로 리다이렉트)
 * - requireAuth 없음: 인증 도메인 (인증 있으면 메인으로 리다이렉트)
 */
export const RouteGuard = ({ requireAuth = false, children }: GuardProps) => {
  const { pathname } = useLocation();
  const isAuthenticated = !!getAccessToken();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={PATH.LANDING} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    if (GUEST_ONLY_PATHS.includes(pathname)) {
      return <Navigate to={PATH.ALL_MEMO} replace />;
    }
  }

  return <>{children}</>;
};
