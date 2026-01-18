import { Icon } from '@cds/icon';

import Button from '../button/button';

import * as styles from './alert-modal.css';

const AlertModal = () => {
  return (
    <div className={styles.container}>
      <Icon name="ic_close" width={28} height={28} className={styles.close} />
      <Icon name="ic_alert" width={56} height={56} />
      <p className={styles.title}>대화창을 닫으시겠습니까?</p>
      <p className={styles.descript}>
        대화창을 닫을시 모든 대화 내역은 삭제됩니다.
      </p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => {}} size="lg" variant="outlined">
          취소
        </Button>
        <Button onClick={() => {}} size="lg">
          확인
        </Button>
      </div>
    </div>
  );
};

export default AlertModal;
