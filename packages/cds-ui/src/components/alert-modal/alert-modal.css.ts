import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '44.4rem',
  height: '27.2rem',
  borderRadius: '16px',

  backgroundColor: themeVars.color.grey50,
  boxShadow: `0 0 12px 0 rgba(0, 0, 0, 0.25)`,
});

export const close = style({
  position: 'absolute',
  top: '1.6rem',
  right: '1.6rem',
  cursor: 'pointer',
});

export const title = style({
  paddingTop: '0.8rem',
  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.black,
});

export const descript = style({
  paddingTop: '0.8rem',
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey600,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '1.2rem',
  paddingTop: '2.5rem',
});
