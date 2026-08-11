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
    removable: {
      false: {
        padding: '0 0.8rem',
      },
      true: {
        border: `1px solid ${themeVars.color.grey300}`,
        padding: '0 0.4rem 0 0.8rem',
      },
    },
    outlined: {
      true: {
        border: '1px solid transparent',
        background: `
          linear-gradient(${themeVars.color.blue50}, ${themeVars.color.blue50}) padding-box,
          ${themeVars.color.gradient02} border-box
        `,
        color: themeVars.color.blue500,
      },
    },
    size: {
      lg: {
        ...themeVars.fontStyles.body_m_14,
        height: '2.4rem',
      },
      sm: {
        ...themeVars.fontStyles.label_m_12,
        height: '1.8rem',
      },
    },
  },
});

export const indicator = recipe({
  variants: {
    outlined: {
      true: {
        backgroundColor: themeVars.color.blue500,
      },
    },
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
