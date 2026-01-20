import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { PATH } from '@shared/router/path';
import { setAccessToken } from '@shared/storage/token-storage';

import { exchangeGoogleCode } from '@features/auth/api/exchange-google-code';

import { MemoInput } from '@widgets/memo';

import * as styles from './new-memo-page.css';

const NewMemoPage = () => {
  const navigate = useNavigate();
  const hasExchangedRef = useRef(false);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code || hasExchangedRef.current) {
      return;
    }
    hasExchangedRef.current = true;

    const exchangeCode = async () => {
      try {
        const response = await exchangeGoogleCode(code);

        if (!response?.accessToken) {
          throw new Error('AccessToken을 찾을 수 없습니다.');
        }

        setAccessToken(response.accessToken);
        navigate(PATH.NEW_MEMO, { replace: true });
      } catch (error) {
        console.error('로그인 실패:', error);
        navigate(PATH.LOGIN, { replace: true });
      }
    };

    exchangeCode();
  }, [navigate]);

  return (
    <div className={styles.pageContainer}>
      <MemoInput />
    </div>
  );
};

export default NewMemoPage;
