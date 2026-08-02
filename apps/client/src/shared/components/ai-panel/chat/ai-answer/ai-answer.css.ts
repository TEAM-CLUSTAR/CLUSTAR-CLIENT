import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.2rem',
});

export const headerLeft = style({
  display: 'flex',
  gap: '1.2rem',
});

export const summary = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const summaryText = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const memoChip = style({
  display: 'flex',
  gap: '0.4rem',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  backgroundColor: themeVars.color.grey100,
  color: themeVars.color.grey700,
  ...themeVars.fontStyles.label_m_12,
});

export const actions = style({
  display: 'flex',
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
});

export const content = style({
  width: '100%',
  padding: '1.6rem 1.8rem',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  whiteSpace: 'pre-wrap',
});
