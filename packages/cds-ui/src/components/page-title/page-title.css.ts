import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  gap: '1.1rem',
  alignItems: 'center',
});

export const title = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey900,
});

export const count = style({
  display: 'flex',
  height: '2.5rem',
  padding: '0 0.8rem',
  backgroundColor: themeVars.color.blue100,
  border: `1px solid ${themeVars.color.blue300}`,
  borderRadius: '10rem',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.blue500,
  alignItems: 'center',
});
