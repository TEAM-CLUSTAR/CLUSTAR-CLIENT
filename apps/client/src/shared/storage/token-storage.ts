const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * 액세스 토큰 저장
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * 액세스 토큰 조회
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 액세스 토큰 삭제
 */
export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * 리프레시 토큰 저장
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * 리프레시 토큰 조회
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 리프레시 토큰 삭제
 */
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 모든 토큰 삭제
 */
export const clearTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};
