import { useEffect, useMemo, useRef, useState } from 'react';
import { useBlocker } from 'react-router';

import { PATH } from '@shared/router/path';

import type { DraftsById, MemoDraft } from '../ui/memo-input/memo-input';

interface UseNavigationBlockerProps {
  draftsById: DraftsById;
  isConfirmModalOpen: boolean;
  tabToDeleteId: string | null;
  setIsConfirmModalOpen: (open: boolean) => void;
  setIsHaveCancel: (value: boolean) => void;
}

interface UseNavigationBlockerReturn {
  pendingNavigation: (() => void) | null;
  handleNavigationConfirm: (onReset: () => void) => void;
  handleNavigationCancel: () => void;
}

export const useNavigationBlocker = ({
  draftsById,
  isConfirmModalOpen,
  tabToDeleteId,
  setIsConfirmModalOpen,
  setIsHaveCancel,
}: UseNavigationBlockerProps): UseNavigationBlockerReturn => {
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const isResettingRef = useRef(false);

  const normalizeContents = (contents: string): string => {
    if (!contents) return '';
    const withoutTags = contents.replace(/<[^>]*>/g, '');
    return withoutTags.replace(/&nbsp;/g, ' ').trim();
  };

  const hasUnsavedChanges = useMemo(() => {
    return Object.values(draftsById).some((draft: MemoDraft) => {
      const hasTitle = draft.title.trim().length > 0;
      const hasContents = normalizeContents(draft.contents).length > 0;
      const hasLabels = draft.labels.length > 0;

      return hasTitle || hasContents || hasLabels;
    });
  }, [draftsById]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges &&
      currentLocation.pathname === PATH.NEW_MEMO &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (
      blocker.state === 'blocked' &&
      !isConfirmModalOpen &&
      !tabToDeleteId &&
      !isResettingRef.current
    ) {
      setIsHaveCancel(true);
      setPendingNavigation(() => () => blocker.proceed());
      setIsConfirmModalOpen(true);
    }

    if (blocker.state === 'unblocked' && isResettingRef.current) {
      isResettingRef.current = false;
    }
  }, [
    blocker,
    isConfirmModalOpen,
    tabToDeleteId,
    setIsHaveCancel,
    setIsConfirmModalOpen,
  ]);

  const handleNavigationConfirm = (onReset: () => void) => {
    if (pendingNavigation && blocker.state === 'blocked') {
      onReset();

      setIsConfirmModalOpen(false);
      setIsHaveCancel(false);

      const navFn = pendingNavigation;
      setPendingNavigation(null);
      isResettingRef.current = true;
      navFn();
    }
  };

  const handleNavigationCancel = () => {
    if (pendingNavigation && blocker.state === 'blocked') {
      isResettingRef.current = true;
      blocker.reset();
      setPendingNavigation(null);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return {
    pendingNavigation,
    handleNavigationConfirm,
    handleNavigationCancel,
  };
};
