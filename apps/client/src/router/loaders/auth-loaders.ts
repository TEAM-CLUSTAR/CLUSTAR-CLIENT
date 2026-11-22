import { redirect } from 'react-router';

import {
  acknowledgeSessionEnd,
  getSession,
  type Session,
} from '@shared/auth/session';

import { PATH } from '../path';

export type PrivateLoaderData = Exclude<Session, { status: 'anonymous' }>;

/**
 * 인증이 필요한 라우트
 * - authenticated: 통과
 * - ended: 보던 화면을 유지하고 세션 종료 상태를 반환 (모달로 안내)
 * - anonymous: 로그인으로 리다이렉트
 */
export const privateLoader = (): PrivateLoaderData | Response => {
  const session = getSession();

  if (session.status === 'anonymous') {
    return redirect(PATH.LOGIN);
  }

  return session;
};

/**
 * 로그인 전에만 접근하는 라우트
 * - authenticated: 메인으로 리다이렉트
 * - ended: 공개 화면에 도착했으므로 세션 종료를 확인 처리
 */
export const publicLoader = () => {
  const session = getSession();

  if (session.status === 'authenticated') {
    return redirect(PATH.ROOT);
  }

  acknowledgeSessionEnd();
  return null;
};
