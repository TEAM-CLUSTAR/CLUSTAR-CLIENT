import { style } from '@vanilla-extract/css';

import { slideInUp, themeVars } from '@cds/ui';

export const bubbleBox = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.6rem 2rem',
  borderRadius: '16px 4px 16px 16px',
  border: `1px solid ${themeVars.color.grey300}`,
  backgroundColor: themeVars.color.white,
  animation: `${slideInUp} 0.7s ease-out`,
  ...themeVars.fontStyles.body_m_16,
});
