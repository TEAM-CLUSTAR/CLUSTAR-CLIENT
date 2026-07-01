import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: '3.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: themeVars.color.grey100,
      },
    },
  },

  variants: {
    relation: {
      parent: {
        width: '61.2rem',
        position: 'relative',
        '::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-0.4rem',
          height: '1px',
          backgroundColor: themeVars.color.grey100,
          pointerEvents: 'none',
        },
      },
      child: {
        width: '58.6rem',
      },
      descendant: {
        width: '55.4rem',
      },
    },
  },
});

export const checkbox = style({
  appearance: 'none',
});

export const icon = style({
  margin: '0.4rem',
});

export const tag = style({
  width: '100%',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
