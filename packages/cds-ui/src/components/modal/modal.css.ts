import { style } from '@vanilla-extract/css';
import { keyframes } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.5)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
});

const opacityShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const opacityHide = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',

  zIndex: themeVars.zIndex.modalOverlay,
  selectors: {
    '&[data-state="open"]': {
      animation: `${opacityShow} 100ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${opacityHide} 100ms ease-in forwards`,
    },
  },
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  backgroundColor: themeVars.color.grey50,
  border: `1px solid ${themeVars.color.white}`,
  borderRadius: '16px',

  zIndex: themeVars.zIndex.modalContent,
  outline: 'none',

  selectors: {
    '&[data-state="open"]': {
      animation: `${contentShow} 100ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${contentHide} 100ms ease-in forwards`,
    },
  },
});
