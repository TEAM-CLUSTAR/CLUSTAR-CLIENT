import { style } from '@vanilla-extract/css';

import { slideInUp, themeVars } from '@cds/ui';

export const bubbleBox = style({
  display: 'inline-flex',
  flexDirection: 'column',
  padding: '1.6rem 1.8rem',
  borderRadius: '12px 4px 12px 12px',
  backgroundColor: themeVars.color.grey50,
  animation: `${slideInUp} 0.7s ease-out`,
  ...themeVars.fontStyles.body_m_16,
  maxWidth: '36rem',
  color: themeVars.color.grey800,
  gap: '1rem',
});

export const textContent = style({
  overflow: 'hidden',
  whiteSpace: 'normal',
  transition: 'max-height 0.35s ease',
  maxHeight: '12rem',
});

export const toggleBtn = style({
  display: 'flex',
  color: themeVars.color.grey500,
  ...themeVars.fontStyles.body_m_14,
});
