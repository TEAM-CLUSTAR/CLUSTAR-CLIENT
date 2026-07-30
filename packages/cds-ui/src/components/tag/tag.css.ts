import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    borderRadius: '4px',
    width: 'fit-content',
    flexShrink: 0,
    userSelect: 'none',
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
      false: {
        cursor: 'default',
      },
    },
    removable: {
      true: {
        border: `1px solid ${themeVars.color.grey300}`,
      },
      false: {},
    },
    size: {
      lg: {
        ...themeVars.fontStyles.body_m_14,
        height: '2.4rem',
        padding: '0 0.8rem',
      },
      sm: {
        ...themeVars.fontStyles.label_m_12,
        height: '1.8rem',
        padding: '0 0.6rem',
      },
    },
  },
});

export const indicator = recipe({
  variants: {
    size: {
      lg: {
        width: '0.8rem',
        height: '0.8rem',
        borderRadius: '2px',
      },
      sm: {
        width: '0.6rem',
        height: '0.6rem',
        borderRadius: '1px',
      },
    },
  },
});
