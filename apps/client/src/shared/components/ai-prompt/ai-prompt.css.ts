import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

import { slideInRight } from 'node_modules/@cds/ui/src/styles/animations.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '58rem',
  maxWidth: '60rem',
  height: '100%',
  maxHeight: '100%',
  backgroundColor: themeVars.color.grey50,
  padding: '0 2.4rem 2.4rem 2.4rem',
  borderRadius: '16px',
  border: `3px solid ${themeVars.color.white}`,
  animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
});
