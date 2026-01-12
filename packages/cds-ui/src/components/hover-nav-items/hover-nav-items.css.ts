import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const labelContainer = style({
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0.8rem',
  gap: '0.6rem',
});

export const menuContainer = style({
  padding: '0.4rem 0.8rem',
  height: '2.8rem',
});

export const commonContainer = style({
  display: 'inline-flex',
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.grey700,
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.white}`,
  backgroundColor: themeVars.color.grey50,
});
