import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { getAccessToken } from '@shared/utils/token-storage';

import { PATH } from './path';

type GuardMode = 'private' | 'public' | 'common';

type GuardProps = {
  mode: GuardMode;
  children: ReactNode;
};

/**
 * @description 라우트 가드
 * - private: 인증이 필요한 라우트 (인증 없으면 랜딩으로 리다이렉트)
 * - public: 비인증 사용자만 접근 가능한 라우트 (인증 있으면 메인으로 리다이렉트)
 * - common: 인증 여부와 관계없이 접근 가능한 라우트
 */
export const RouteGuard = ({ mode, children }: GuardProps) => {
  const isAuthenticated = !!getAccessToken();

  if (mode === 'private' && !isAuthenticated) {
    return <Navigate to={PATH.LANDING} replace />;
  }

  if (mode === 'public' && isAuthenticated) {
    return <Navigate to={PATH.ALL_MEMO} replace />;
  }

  return <>{children}</>;
};
