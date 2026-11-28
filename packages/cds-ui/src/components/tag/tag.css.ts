import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, radius, spacing, typography } from '@cds/token/v2';

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: spacing[2],
    padding: `0 ${spacing[4]}`,
    borderRadius: radius.sm,
    outline: '1px solid transparent',
    outlineOffset: '-1px',
    userSelect: 'none',
  },
  variants: {
    size: {
      sm: { height: '2rem', maxWidth: '12rem', ...typography.label_sm },
      md: { height: '2.4rem', maxWidth: '16rem', ...typography.label_md },
    },
    removable: {
      true: {
        paddingLeft: '0.7rem',
        selectors: {
          '&:hover': {
            backgroundImage: `linear-gradient(${color.bg.hover}, ${color.bg.hover})`,
          },
        },
      },
    },
  },
});

export const text = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const removeIcon = recipe({
  variants: {
    size: {
      sm: { width: '1.2rem', height: '1.2rem' },
      md: { width: '1.4rem', height: '1.4rem' },
    },
  },
});
