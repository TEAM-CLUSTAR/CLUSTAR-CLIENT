import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { getAccessToken } from '../storage/token-storage';
import { PATH } from './path';

type GuardProps = {
  requireAuth?: boolean;
  guestOnly?: boolean;
  children: ReactNode;
};

/**
 * @description 라우트 가드
 * - requireAuth: 인증이 필요한 라우트 (인증 없으면 랜딩으로 리다이렉트)
 * - guestOnly: 비인증 사용자만 접근 가능한 라우트 (인증 있으면 메인으로 리다이렉트)
 */
export const RouteGuard = ({
  requireAuth = false,
  guestOnly = false,
  children,
}: GuardProps) => {
  const isAuthenticated = !!getAccessToken();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={PATH.LANDING} replace />;
  }

  if (guestOnly && isAuthenticated) {
    return <Navigate to={PATH.ALL_MEMO} replace />;
  }

  return <>{children}</>;
};
