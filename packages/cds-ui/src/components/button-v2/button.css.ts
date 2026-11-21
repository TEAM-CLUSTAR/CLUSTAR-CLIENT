import { recipe } from '@vanilla-extract/recipes';

import { color, radius, spacing, typography } from '@cds/token/v2';

const ENABLED = '&:not(:disabled)';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: radius.md,
    boxSizing: 'border-box',
    transition: 'background-color 0.2s ease',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        color: color.text.disabled,
      },
    },
  },

  variants: {
    size: {
      sm: {
        ...typography.label_md,
        gap: spacing[4],
        height: '3.2rem',
        minWidth: '5.4rem',
        padding: `0 ${spacing[8]}`,
      },
      md: {
        ...typography.label_lg,
        gap: spacing[6],
        height: '4rem',
        minWidth: '7.2rem',
        padding: `0 ${spacing[12]}`,
      },
    },

    variant: {
      primary: {
        backgroundColor: color.bg.brand,
        color: color.text.on_brand,
        selectors: {
          [`${ENABLED}:hover`]: { backgroundColor: color.bg.brand_hover },
          [`${ENABLED}:active`]: { backgroundColor: color.bg.brand_pressed },
          '&:disabled': { backgroundColor: color.bg.muted },
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        border: `1px solid ${color.border.default}`,
        color: color.text.primary,
        selectors: {
          [`${ENABLED}:hover`]: { backgroundColor: color.bg.hover },
          [`${ENABLED}:active`]: { backgroundColor: color.bg.pressed },
          '&:disabled': { borderColor: color.border.subtle },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: color.text.primary,
        selectors: {
          [`${ENABLED}:hover`]: { backgroundColor: color.bg.hover },
          [`${ENABLED}:active`]: { backgroundColor: color.bg.pressed },
        },
      },
      danger: {
        backgroundColor: color.bg.danger,
        color: color.text.on_brand,
        selectors: {
          [`${ENABLED}:hover`]: { backgroundColor: color.bg.danger_hover },
          [`${ENABLED}:active`]: { backgroundColor: color.bg.danger_pressed },
          '&:disabled': { backgroundColor: color.bg.muted },
        },
      },
    },
  },
});
