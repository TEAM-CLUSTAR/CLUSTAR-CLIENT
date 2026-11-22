import { useState } from 'react';
import { PATH } from '@router/path';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useSubmit } from 'react-router';

import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import { USER_QUERY_OPTION } from '@shared/apis/user/queries';
import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';

import * as styles from './mypage-modal.css';

interface MypageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MypageModal = ({ open, onOpenChange }: MypageModalProps) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { data: user } = useQuery({
    ...USER_QUERY_OPTION.GET_USER(),
    enabled: open,
  });
  const isLoggingOut =
    navigation.state === 'submitting' && navigation.formAction === PATH.LOGOUT;

  const [isWithdrawConfirmOpen, setIsWithdrawConfirmOpen] = useState(false);

  const handleLogout = () => {
    submit(null, { method: 'post', action: PATH.LOGOUT, replace: true });
  };

  const handleOpenWithdrawConfirm = () => {
    onOpenChange(false);
    setIsWithdrawConfirmOpen(true);
  };

  // @TODO: 탈퇴 API 추가 후 연결
  const handleWithdraw = () => {};

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <Modal.Content className={styles.container} ariaLabel="설정">
          <div className={styles.header}>
            <h2 className={styles.title}>설정</h2>
            <Modal.Close>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="닫기"
              >
                <Icon name="ic_delete" size={16} color="secondary" />
              </button>
            </Modal.Close>
          </div>

          <div className={styles.content}>
            <section className={styles.accountSection}>
              <span className={styles.sectionTitle}>계정</span>
              <div className={styles.row}>
                <div className={styles.avatar}>
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt=""
                      className={styles.avatarImage}
                    />
                  ) : (
                    <span className={styles.avatarInitial}>
                      {user?.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className={styles.rowText}>
                  <span className={styles.rowTitle}>{user?.name}</span>
                  <span className={styles.rowDescription}>
                    {user?.email} · Google 계정
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  로그아웃
                </Button>
              </div>
            </section>

            <hr className={styles.divider} />

            <div className={styles.row}>
              <div className={styles.rowText}>
                <span className={styles.rowTitle}>회원 탈퇴</span>
                <span className={styles.rowDescription}>
                  계정과 메모, AI 기록을 모두 삭제해요.
                </span>
              </div>
              <Button
                size="sm"
                variant="danger"
                onClick={handleOpenWithdrawConfirm}
              >
                탈퇴하기
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      <ConfirmModal
        open={isWithdrawConfirmOpen}
        onOpenChange={setIsWithdrawConfirmOpen}
        title="탈퇴할까요?"
        description="메모와 AI 기록이 바로 삭제되고, 되돌릴 수 없어요. 필요한 내용은 먼저 옮겨 두세요."
        confirmCheckLabel="삭제된 내용은 복구할 수 없다는 걸 확인했어요"
        type="danger"
        hasSecondary
        confirmLabel="탈퇴하기"
        onConfirm={handleWithdraw}
      />
    </>
  );
};

export default MypageModal;
