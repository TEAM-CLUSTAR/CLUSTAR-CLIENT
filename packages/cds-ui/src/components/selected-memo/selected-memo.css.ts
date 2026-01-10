import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '4rem',
  padding: '0 1.2rem 0 0.8rem',
  border: '1px solid',
  borderColor: themeVars.color.blue300,
  borderRadius: '1rem',
  backgroundColor: themeVars.color.blue50,
});

export const contentWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const name = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.blue500,
});
