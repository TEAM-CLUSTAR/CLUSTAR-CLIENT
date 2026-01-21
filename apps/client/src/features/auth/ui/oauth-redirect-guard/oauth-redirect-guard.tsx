import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { PATH } from '@shared/router/path';

type OAuthRedirectGuardProps = {
  children: ReactNode;
};

/**
 * OAuth callback 코드가 URL에 있으면 login-callback으로 리다이렉트
 * Google OAuth는 어떤 경로로든 ?code=... 파라미터와 함께 리다이렉트될 수 있음
 */
const OAuthRedirectGuard = ({ children }: OAuthRedirectGuardProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  if (location.pathname === PATH.LOGIN_CALLBACK) {
    return <>{children}</>;
  }

  if (error) {
    const errorDescription = searchParams.get('error_description');
    console.error('OAuth error:', error, errorDescription);
    return (
      <Navigate to={PATH.LOGIN} state={{ error, errorDescription }} replace />
    );
  }

  if (code) {
    const savedState = sessionStorage.getItem('oauth_state');
    if (savedState && state && state !== savedState) {
      console.error('State mismatch - possible CSRF attack');
      sessionStorage.removeItem('oauth_state');
      return (
        <Navigate to={PATH.LOGIN} state={{ error: 'invalid_state' }} replace />
      );
    }

    if (savedState) {
      sessionStorage.removeItem('oauth_state');
    }

    return <Navigate to={`${PATH.LOGIN_CALLBACK}${location.search}`} replace />;
  }

  return <>{children}</>;
};

export default OAuthRedirectGuard;
