import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '58rem',
  maxWidth: '60rem',
  height: '100vh',
  backgroundColor: themeVars.color.grey50,
  padding: '0 2.4rem 2.4rem 2.4rem',
  borderRadius: '16px',
  border: `3px solid ${themeVars.color.white}`,
});
