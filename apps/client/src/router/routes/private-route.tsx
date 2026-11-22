import { useEffect } from 'react';
import { PATH } from '@router/path';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router';

import { subscribeSession } from '@shared/auth/session';
import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';

import type { PrivateLoaderData } from '../loaders/auth-loaders';

const PrivateRoute = () => {
  const session = useLoaderData<PrivateLoaderData>();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  useEffect(() => subscribeSession(revalidate), [revalidate]);

  return (
    <>
      <Outlet />
      {session.status === 'ended' && (
        <ConfirmModal
          title="다시 로그인해 주세요"
          description="로그인이 만료됐어요. 쓰던 내용은 이 기기에 임시 저장돼 있어서, 다시 로그인하면 이어서 쓸 수 있어요."
          open
          confirmLabel="Google로 다시 로그인"
          onConfirm={() => navigate(PATH.LOGIN)}
        />
      )}
    </>
  );
};

export default PrivateRoute;
