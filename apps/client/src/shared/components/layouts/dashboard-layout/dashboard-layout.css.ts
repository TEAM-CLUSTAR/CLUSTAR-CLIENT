import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const root = style({
  display: 'flex',
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundColor: themeVars.color.grey50,
});

export const mainContent = style({
  flexGrow: 1,
  overflow: 'auto',
});
