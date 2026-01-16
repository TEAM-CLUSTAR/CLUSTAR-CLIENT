import { style } from '@vanilla-extract/css';

import backgroundImage from '../../assets/background.png';

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
  zIndex: 1,
  minHeight: '100vh',
  display: 'flex',
});

export const mainContent = style({
  flex: 1,
  position: 'relative',
  overflow: 'auto',
});
