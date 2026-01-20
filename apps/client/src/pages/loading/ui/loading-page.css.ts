import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  width: '100vw',
  height: '100vh',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: themeVars.color.grey100,
});

const rotateLoading = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loadingContainer = style({
  position: 'relative',
  width: '20rem',
  height: '20rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const spinner = style({
  position: 'absolute',

  width: '100%',
  height: '100%',
  borderRadius: '50%',

  border: '2px solid transparent',
  borderTopColor: themeVars.color.blue500,
  borderBottomColor: themeVars.color.blue500,

  animation: `${rotateLoading} 1.7s linear infinite`,
});

export const logo = style({
  width: '9rem',
  height: '9rem',
  objectFit: 'contain',
});
