import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

import {
  contentHide,
  contentShow,
  opacityHide,
  opacityShow,
} from '../../styles/animations.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',

  zIndex: themeVars.zIndex.modalOverlay,
  selectors: {
    '&[data-state="open"]': {
      animation: `${opacityShow} 400ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${opacityHide} 400ms ease-in forwards`,
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
