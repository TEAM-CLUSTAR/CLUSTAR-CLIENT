import { useEffect } from 'react';

import * as styles from '../modal.css';

const useScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;

    // 스크롤 잠금
    document.body.classList.add(styles.scrollLocked);
    document.body.style.setProperty('top', `-${scrollY}px`);

    return () => {
      // 원래 스타일 복원
      document.body.classList.remove(styles.scrollLocked);
      document.body.style.removeProperty('top');
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
};

export default useScrollLock;
