import { api } from '@shared/api/instance';

import { END_POINT } from './end-point';

export interface GoogleLoginResult {
  accessToken: string;
}

export const exchangeGoogleCode = async (
  code: string,
): Promise<GoogleLoginResult> => {
  const response = await api.get(END_POINT.LOGIN.EXCHANGE_GOOGLE_CODE, {
    params: { code },
  });

  const authHeader =
    response.headers?.authorization ?? response.headers?.Authorization;

  if (!authHeader) {
    throw new Error(
      `Missing Authorization header (status: ${response.status})`,
    );
  }

  const accessToken = authHeader.replace(/^Bearer\s+/i, '');

  if (!accessToken) {
    throw new Error('Access Token이 비어있거나 형식이 잘못되었습니다.');
  }

  return { accessToken };
};
