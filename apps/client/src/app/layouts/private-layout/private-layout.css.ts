import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

import backgroundImage from '/background.png';

export const root = style({
  minHeight: '100vh',
  position: 'relative',
  width: '100%',
});

export const bgLayer = style({
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  pointerEvents: 'none',
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
});

export const content = style({
  position: 'relative',
  zIndex: themeVars.zIndex.sidebar,
  minHeight: '100vh',
  display: 'flex',
});

export const sidebarContainer = style({
  padding: '2rem 0 2rem 2rem',
});

export const mainContent = style({
  flexGrow: 1,
  position: 'relative',
  overflow: 'auto',
});
