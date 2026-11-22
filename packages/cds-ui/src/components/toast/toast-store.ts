import type { ComponentProps } from 'react';

import type Toast from './toast';

type ToastProps = ComponentProps<typeof Toast>;
type ToastType = NonNullable<ToastProps['type']>;

interface ToastOptions {
  action?: ToastProps['action'];
  keepOnNextReset?: boolean;
}

interface ToastData extends ToastOptions {
  id: number;
  type: ToastType;
  message: string;
}

const TOAST_DURATION_MS = 3000;

let current: ToastData | null = null;
let counter = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const set = (toast: ToastData | null) => {
  clearTimeout(timer);
  current = toast;
  if (toast) {
    timer = setTimeout(() => set(null), TOAST_DURATION_MS);
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => current;

const show = (type: ToastType) => (message: string, options?: ToastOptions) => {
  counter += 1;
  set({ ...options, id: counter, type, message });
  return counter;
};

const dismiss = (id?: number) => {
  if (current && (id === undefined || current.id === id)) {
    set(null);
  }
};

const reset = () => {
  if (current?.keepOnNextReset) {
    set({ ...current, keepOnNextReset: false });
    return;
  }
  dismiss();
};

export const toastStore = { subscribe, getSnapshot, dismiss, reset };

export const toast = {
  info: show('info'),
  success: show('success'),
  error: show('error'),
  dismiss,
};
