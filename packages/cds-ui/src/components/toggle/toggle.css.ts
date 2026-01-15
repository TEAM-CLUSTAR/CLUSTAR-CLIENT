import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: themeVars.color.grey200,
  padding: '0.4rem',
  borderRadius: '4px',
  border: `1px solid ${themeVars.color.grey300}`,
  width: 'fit-content',
});

export const slider = style({
  position: 'absolute',
  top: '0.4rem',
  left: '0.4rem',
  height: 'calc(100% - 0.8rem)',
  width: 'calc((100% - 0.8rem) / var(--total-items, 1))',
  backgroundColor: themeVars.color.white,
  borderRadius: '4px',
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
  transform: 'translateX(calc(var(--active-index, 0) * 100%))',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  pointerEvents: 'none',
});

export const item = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.4rem',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    zIndex: 1,
  },

  variants: {
    active: {
      true: {
        color: themeVars.color.grey900,
      },
      false: {
        color: themeVars.color.grey600,
      },
    },
  },
});
