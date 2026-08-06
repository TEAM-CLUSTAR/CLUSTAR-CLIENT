import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const root = style({
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundColor: themeVars.color.grey50,
});

export const content = style({
  zIndex: themeVars.zIndex.sidebar,
  display: 'flex',
});

export const sidebarContainer = style({
  padding: '2rem 0 2rem 2rem',
});

export const mainContent = style({
  flexGrow: 1,
  overflow: 'auto',
});
