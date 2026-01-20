import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { PATH } from '@shared/router/path';

import GlobalErrorBoundary from '../providers/global-error-boundary';

export default function GlobalLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 예: http://localhost:5173/?code=... 로 떨어진 경우
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (!code) return;
    if (location.pathname !== '/') return;

    // dev 서버로 전체 페이지 리다이렉트하지 않고,
    // SPA 내에서 /oauth/callback 라우트로만 이동시킨다.
    navigate(`${PATH.LOGIN_CALLBACK}${location.search}`, { replace: true });
  }, [location.pathname, location.search, navigate]);

  return (
    <GlobalErrorBoundary>
      <Outlet />
    </GlobalErrorBoundary>
  );
}
