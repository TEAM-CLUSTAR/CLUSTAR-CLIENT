import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: themeVars.color.grey200,
  padding: '0.4rem',
  borderRadius: '4px',
  border: `1px solid ${themeVars.color.grey300}`,
  width: 'fit-content',
  gap: '0.4rem',
});

export const item = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.4rem',
    borderRadius: '4px',
    border: 'none',
    transition: 'all 0.2s ease',
  },

  variants: {
    active: {
      true: {
        backgroundColor: themeVars.color.white,
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});
