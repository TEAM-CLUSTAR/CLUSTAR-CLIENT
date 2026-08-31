import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  flex: 1,
  minHeight: 0,
});

export const text = style({
  ...themeVars.fontStyles.title_m_20,
  color: themeVars.color.grey400,
});
