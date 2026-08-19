import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.4rem',
    cursor: 'pointer',
    width: '100%',
    borderRadius: '8px',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.grey200,
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.03)',
      },
      false: {
        ':hover': {
          backgroundColor: themeVars.color.grey100,
        },
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export const text = recipe({
  base: {
    color: themeVars.color.grey700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  variants: {
    type: {
      sm: themeVars.fontStyles.body_m_14,
      lg: themeVars.fontStyles.body_m_16,
    },
  },
});
