import { api } from '@shared/api/instance';

import { END_POINT } from '@features/auth/model/end_point';

export interface GoogleLoginResult {
  accessToken: string;
}

export const exchangeGoogleCode = async (code: string) => {
  const response = await api.get(
    `${END_POINT.LOGIN.EXCHANGE_GOOGLE_CODE}?code=${encodeURIComponent(code)}`,
  );

  const authHeader =
    response.headers['authorization'] || response.headers['Authorization'];

  if (!authHeader || typeof authHeader !== 'string') {
    throw new Error('Authorization 헤더를 찾을 수 없습니다.');
  }

  const accessToken = authHeader.replace(/^Bearer\s+/i, '');

  return { accessToken };
};
