import {
  clearTokens,
  getAccessToken,
  setAccessToken,
} from '@shared/utils/token-storage';

/**
 * 세션이 끝난 이유
 * - expired: 토큰 만료 (서버 401)
 * - signed-out: 로그아웃 (다른 탭에서의 로그아웃, 토큰 직접 삭제 포함)
 */
export type SessionEndReason = 'expired' | 'signed-out';

/**
 * 현재 탭의 인증 세션
 * - authenticated: 로그인 상태
 * - anonymous: 이 탭에서 로그인한 적 없음 (새로 연 탭, 새로고침, 종료 확인 후)
 * - ended: 이 탭이 로그인 상태로 화면을 보던 중 세션이 끝남
 */
export type Session =
  | { status: 'authenticated' }
  | { status: 'anonymous' }
  | { status: 'ended'; reason: SessionEndReason };

const END_REASON_KEY = 'sessionEndReason';

const AUTHENTICATED: Session = { status: 'authenticated' };
const ANONYMOUS: Session = { status: 'anonymous' };

const listeners = new Set<() => void>();

let current: Session = getAccessToken() ? AUTHENTICATED : ANONYMOUS;

const readEndReason = (): SessionEndReason => {
  const reason = localStorage.getItem(END_REASON_KEY);
  return reason === 'expired' ? 'expired' : 'signed-out';
};

/**
 * 저장소(localStorage)의 토큰과 이 탭의 이전 상태로 현재 세션을 계산한다.
 * 토큰이 없어졌을 때, 이 탭이 로그인 상태였던 경우에만 ended로 본다.
 */
const resolve = (): Session => {
  if (getAccessToken()) return AUTHENTICATED;
  if (current.status === 'authenticated') {
    return { status: 'ended', reason: readEndReason() };
  }
  return current;
};

const isSame = (a: Session, b: Session) => {
  if (a.status === 'ended' && b.status === 'ended') {
    return a.reason === b.reason;
  }
  return a.status === b.status;
};

const update = (next: Session) => {
  if (isSame(current, next)) return;
  current = next;
  listeners.forEach((listener) => listener());
};

/**
 * 현재 세션 조회
 */
export const getSession = (): Session => {
  current = resolve();
  return current;
};

/**
 * 세션 변경 구독 (같은 탭의 변경 + 다른 탭의 storage 변경)
 * @returns 구독 해제 함수
 */
export const subscribeSession = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * 로그인 성공 시 세션 시작
 */
export const startSession = (accessToken: string) => {
  localStorage.removeItem(END_REASON_KEY);
  setAccessToken(accessToken);
  update(AUTHENTICATED);
};

/**
 * 세션 종료. 종료 이유를 토큰보다 먼저 기록해 다른 탭도 같은 이유를 읽도록 한다.
 */
export const endSession = (reason: SessionEndReason) => {
  if (resolve().status !== 'authenticated') return;

  localStorage.setItem(END_REASON_KEY, reason);
  clearTokens();
  update({ status: 'ended', reason });
};

/**
 * 서버가 401을 반환했을 때 호출
 * - 토큰이 남아 있으면 만료로 세션 종료
 * - 토큰이 이미 없으면 (직접 삭제 등) 저장소 상태를 반영
 */
export const handleUnauthorized = () => {
  if (getAccessToken()) {
    endSession('expired');
    return;
  }
  update(resolve());
};

/**
 * 세션 종료를 확인하고 로그인 전 상태로 되돌림 (공개 화면으로 이동했을 때)
 */
export const acknowledgeSessionEnd = () => {
  if (current.status === 'ended') {
    current = ANONYMOUS;
  }
};

window.addEventListener('storage', () => {
  update(resolve());
});
