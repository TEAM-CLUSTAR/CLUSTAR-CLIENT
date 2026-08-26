import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
});

export const tooltip = style({
  position: 'absolute',
  bottom: '100%',
  left: 0,
  transform: 'translateY(-0.4rem)',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 0.15s ease',
  zIndex: themeVars.zIndex.default,
  pointerEvents: 'none',

  selectors: {
    [`${wrapper}:hover &`]: {
      visibility: 'visible',
      opacity: 1,
    },
  },
});
