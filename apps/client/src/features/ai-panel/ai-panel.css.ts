import { style } from '@vanilla-extract/css';

import { slideInRight, themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '48rem',
  height: '100%',
  backgroundColor: themeVars.color.white,
  borderLeft: `1px solid ${themeVars.color.grey200}`,
  animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  flex: 1,
  minHeight: 0,
  padding: '1.6rem',
});
