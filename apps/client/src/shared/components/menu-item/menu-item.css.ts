import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, fontStyles } from '@cds/token';
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
    size: {
      sm: themeVars.fontStyles.body_m_14,
      lg: themeVars.fontStyles.body_m_16,
    },
    isSelected: {
      true: {
        ...fontStyles.body_m_16,
        color: color.grey800,
      },
      false: {},
    },
  },
});

export const chevron = style({
  marginLeft: 'auto',
  flexShrink: 0,
  opacity: 0,
  transform: 'rotate(0deg)',
  transition: 'transform 0.2s ease',
  selectors: {
    [`${container.classNames.base}:hover &`]: {
      opacity: 1,
    },
    [`${container.classNames.base}[data-state="open"] &`]: {
      transform: 'rotate(180deg)',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const chevronContainer = style({
  marginLeft: 'auto',
  flexShrink: 0,
  padding: '0.6rem',
});
