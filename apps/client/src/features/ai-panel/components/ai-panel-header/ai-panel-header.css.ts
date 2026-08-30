import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '7.2rem',
  padding: '0 2rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const titleGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const title = style({
  ...themeVars.fontStyles.body_sb_16,
  color: themeVars.color.grey700,
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const actionContainer = style({
  position: 'relative',
  display: 'flex',
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '8px',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const tooltip = recipe({
  base: {
    position: 'absolute',
    top: 'calc(100% + 0.4rem)',
    zIndex: themeVars.zIndex.tooltip,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 120ms ease',
    selectors: {
      [`${actionContainer}:hover &`]: {
        opacity: 1,
      },
    },
  },
  variants: {
    align: {
      center: {
        left: '50%',
        transform: 'translateX(-50%)',
      },
      end: {
        right: 0,
      },
    },
  },
  defaultVariants: {
    align: 'center',
  },
});
