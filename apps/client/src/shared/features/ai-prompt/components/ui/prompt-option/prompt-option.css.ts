import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'inline-flex',
  padding: '0.4rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey100,
  border: `1px solid ${themeVars.color.grey200}`,
  gap: '0.4rem',
});

export const optionContainer = style({
  position: 'relative',
  selectors: {
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: '-0.2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '1.8rem',
      borderLeft: `1px solid ${themeVars.color.grey200}`,
    },
  },
});

export const optionItem = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, box-shadow 0.4s ease',
  },

  variants: {
    active: {
      true: {
        backgroundColor: themeVars.color.white,
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
});

export const popoverContainer = style({
  position: 'absolute',
  bottom: 'calc(100% + 0.8rem)',
  left: '-15%',
});
