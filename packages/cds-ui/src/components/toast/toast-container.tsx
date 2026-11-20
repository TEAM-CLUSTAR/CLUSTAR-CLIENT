import { useEffect, useRef, useSyncExternalStore } from 'react';

import Toast from './toast';
import { toastStore } from './toast-store';

interface ToastContainerProps {
  resetKey?: string;
}

const ToastContainer = ({ resetKey }: ToastContainerProps) => {
  const toast = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
  );

  const prevResetKeyRef = useRef(resetKey);
  useEffect(() => {
    if (prevResetKeyRef.current === resetKey) {
      return;
    }
    prevResetKeyRef.current = resetKey;
    toastStore.reset();
  }, [resetKey]);

  if (toast === null) {
    return null;
  }

  const action = toast.action && {
    text: toast.action.text,
    onClick: () => {
      toast.action?.onClick();
      toastStore.dismiss(toast.id);
    },
  };

  return <Toast type={toast.type} message={toast.message} action={action} />;
};

export default ToastContainer;
