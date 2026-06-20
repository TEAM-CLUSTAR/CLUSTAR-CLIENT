import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const getFocusableElements = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      el.offsetWidth > 0 ||
      el.offsetHeight > 0 ||
      el.getClientRects().length > 0,
  );

const useFocusTrap = (isOpen: boolean) => {
  const focusRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 열리는 시점에 현재 포커스 저장
    const previous = document.activeElement as HTMLElement;
    if (previous && previous !== document.body)
      previousFocusRef.current = previous;

    const container = focusRef.current;
    if (!container) return;

    let rafId: number;

    // TODO: 타이밍 의존적인 로직 변경 필요
    // 브라우저의 레이아웃 계산과 페인트가 끝난 직후를 보장하기 위해 requestAnimationFrame 사용 (임의의 시간 지연 제거)
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const currentContainer = focusRef.current;
        if (!currentContainer) return;
        const focusableElements = getFocusableElements(currentContainer);
        if (focusableElements.length > 0) {
          focusableElements[0]?.focus();
        }
      });
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // 매번 다시 쿼리 — 항상 최신 DOM 기준으로 체크
      const elements = getFocusableElements(container);
      if (elements.length === 0) return;

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (!container.contains(document.activeElement)) {
        e.preventDefault();
        firstElement?.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleKeyDown);
      // 닫힐 때 포커스 복원
      if (
        previousFocusRef.current &&
        document.contains(previousFocusRef.current)
      )
        previousFocusRef.current.focus();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  return focusRef;
};

export default useFocusTrap;
