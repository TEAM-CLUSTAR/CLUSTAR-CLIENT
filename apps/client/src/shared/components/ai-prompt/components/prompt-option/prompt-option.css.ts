import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'inline-flex',
  padding: '0.4rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey50,
  border: `1px solid ${themeVars.color.grey100}`,
  gap: '0.4rem',
});

export const optionContainer = style({
  position: 'relative',
});

export const optionItem = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    borderRadius: '4px',
    border: '1px solid transparent',
    transition: 'background-color 0.3s ease, box-shadow 0.4s ease',
  },

  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.color.grey300}`,
        backgroundColor: themeVars.color.white,
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.05)',
      },
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.grey200,
          },
        },
      },
    },
  },
});

export const popoverContainer = style({
  position: 'absolute',
  bottom: 'calc(100% + 0.8rem)',
});
