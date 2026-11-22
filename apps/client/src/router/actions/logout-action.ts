import { redirect } from 'react-router';

import { logoutUser } from '@shared/apis/user/queries';
import { endSession } from '@shared/auth/session';

import { PATH } from '../path';

/**
 * 서버 로그아웃이 실패해도 이 기기의 세션은 종료한다.
 */
export const logoutAction = async () => {
  await logoutUser().catch(() => undefined);
  endSession('signed-out');

  return redirect(PATH.LOGIN);
};
