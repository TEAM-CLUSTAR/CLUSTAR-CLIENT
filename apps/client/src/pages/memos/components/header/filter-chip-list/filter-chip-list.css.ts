import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
});

export const chip = style({
  display: 'flex',
  gap: '0.4rem',
  padding: '0.4rem 0.8rem 0.4rem 1.2rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.blue50,
  border: `1px solid ${themeVars.color.blue200}`,
});

export const tagName = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
});
