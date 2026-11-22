import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useLoaderData, useRevalidator } from 'react-router';

import { subscribeSession } from '@shared/auth/session';

import type { PrivateLoaderData } from '../loaders/auth-loaders';

const PrivateRoute = () => {
  const session = useLoaderData<PrivateLoaderData>();
  const { revalidate } = useRevalidator();
  const queryClient = useQueryClient();
  const prevStatusRef = useRef(session.status);

  useEffect(() => subscribeSession(revalidate), [revalidate]);

  /* 다른 탭에서 다시 로그인해 세션이 이어지면, 이전 세션의 캐시를 버린다 */
  useEffect(() => {
    if (
      prevStatusRef.current === 'ended' &&
      session.status === 'authenticated'
    ) {
      queryClient.resetQueries();
    }
    prevStatusRef.current = session.status;
  }, [session.status, queryClient]);

  return (
    <>
      <Outlet />
      {/* {session.status === 'ended' && (
        <ConfirmModal
          title="다시 로그인해 주세요"
          description="로그인이 만료됐어요. 쓰던 내용은 이 기기에 임시 저장돼 있어서, 다시 로그인하면 이어서 쓸 수 있어요."
        />
      )} */}
    </>
  );
};

export default PrivateRoute;
