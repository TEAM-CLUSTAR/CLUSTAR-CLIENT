import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4rem 0 2.4rem 0',
  gap: '2.4rem',
});

export const titleFilterRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const titleGroup = style({
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
