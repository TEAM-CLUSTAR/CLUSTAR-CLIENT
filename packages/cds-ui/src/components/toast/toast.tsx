import { Icon, IconName } from '@cds/icon';

import * as styles from './toast.css';

type ToastType = 'info' | 'success' | 'error';

const TOAST_ICON: Record<ToastType, IconName> = {
  info: 'ic_info',
  success: 'ic_success',
  error: 'ic_error',
};

interface ToastProps {
  type?: ToastType;
  message: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const Toast = ({ type = 'info', message, action }: ToastProps) => {
  return (
    <div className={styles.toast} role="status">
      <Icon name={TOAST_ICON[type]} size={20} color="white" />
      <p>{message}</p>
      {action && (
        <button
          type="button"
          className={styles.action}
          onClick={action.onClick}
        >
          {action.text}
        </button>
      )}
    </div>
  );
};

export default Toast;
