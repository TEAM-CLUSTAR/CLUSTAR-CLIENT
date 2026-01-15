import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  width: '36rem',
  height: '21.4rem',
  backgroundColor: themeVars.color.grey200,
  border: `1px solid ${themeVars.color.white}`,
  borderRadius: '12px',
  overflow: 'hidden',
  flexShrink: '0',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',

  selectors: {
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 0 20px 1px rgba(0, 0, 0, 0.15)',
    },
  },
});

export const img = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',

  transition: 'transform 0.5s ease',

  selectors: {
    [`${container}:hover &`]: {
      transform: 'scale(1.03)',
    },
  },
});
