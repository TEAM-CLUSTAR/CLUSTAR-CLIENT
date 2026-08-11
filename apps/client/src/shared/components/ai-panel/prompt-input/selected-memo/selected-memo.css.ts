import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  maxWidth: '14.4rem',
  padding: '0.4rem',
  border: `1px solid ${themeVars.color.grey300}`,
  borderRadius: '0.8rem',
  color: themeVars.color.grey700,
});

export const title = style({
  ...themeVars.fontStyles.label_m_12,
  minWidth: 0,
  maxWidth: '8.4rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  userSelect: 'none',
  whiteSpace: 'nowrap',
});
