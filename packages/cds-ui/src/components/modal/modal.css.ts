import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',

  zIndex: themeVars.zIndex.modalOverlay,
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
});
