import { useEffect } from 'react';

const useScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;

    const originStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    // 스크롤 잠금
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`; // 스크롤 위치 고정
    document.body.style.width = '100%'; // fixed로 인한 너비 틀어짐 방지

    return () => {
      // 원래 스타일 복원
      document.body.style.overflow = originStyle.overflow;
      document.body.style.position = originStyle.position;
      document.body.style.top = originStyle.top;
      document.body.style.width = originStyle.width;

      // 스크롤 위치 복원
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
};

export default useScrollLock;
