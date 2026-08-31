import { useEffect, useRef } from 'react';
import { PATH } from '@router/path';
import { useLocation, useNavigate } from 'react-router';

import { LoadingPage } from '@pages/loading';
import { exchangeGoogleCode } from '@pages/login/apis/exchange-google-code';

import { setAccessToken } from '@shared/utils/token-storage';

type LocationState = {
  from?: { pathname: string };
};

const LoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasExchangedRef = useRef(false);

  useEffect(() => {
    if (hasExchangedRef.current) {
      return;
    }
    hasExchangedRef.current = true;

    const state = location.state as LocationState | null;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const oauthError = searchParams.get('error');

    if (oauthError) {
      const errorDescription = searchParams.get('error_description');
      console.error('OAuth error:', oauthError, errorDescription);
      navigate(PATH.LOGIN, { replace: true });
      return;
    }

    if (!code) {
      console.error('Authorization code not found');
      navigate(PATH.LOGIN, { replace: true });
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await exchangeGoogleCode(code);

        if (!response?.accessToken) {
          throw new Error('AccessToken을 찾을 수 없습니다.');
        }

        setAccessToken(response.accessToken);

        const from = state?.from?.pathname || PATH.NEW_MEMO;
        navigate(from, { replace: true });
      } catch (error) {
        console.error('로그인 실패:', error);
        navigate(PATH.LOGIN, { replace: true });
      }
    };

    exchangeCode();
  }, [navigate, location]);

  return <LoadingPage />;
};

export default LoginCallback;
