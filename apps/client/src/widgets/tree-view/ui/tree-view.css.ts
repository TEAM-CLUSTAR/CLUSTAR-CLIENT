import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  height: '100vh',
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

export const spinner = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
  border: '3px solid transparent',
  borderTopColor: themeVars.color.blue500,
  borderBottomColor: themeVars.color.blue500,
  animation: `${rotateLoading} 1s linear infinite`,
});
