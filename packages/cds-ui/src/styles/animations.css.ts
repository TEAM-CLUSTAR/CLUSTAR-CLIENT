import { keyframes } from '@vanilla-extract/css';

export const slideInUp = keyframes({
  '0%': {
    transform: 'translateY(20px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -40%) scale(0.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  '100%': { opacity: 0, transform: 'translate(-50%, -40%) scale(0.96)' },
});

export const opacityShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const opacityHide = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});
