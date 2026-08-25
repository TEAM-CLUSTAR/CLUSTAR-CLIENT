import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  flexShrink: 0,
  gap: '0.8rem',
  alignItems: 'center',
});

export const title = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey700,
});

export const count = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2.4rem',
  padding: '0 0.8rem',
  backgroundColor: themeVars.color.blue100,
  borderRadius: '6px',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.blue500,
});
