import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.4rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey50,
  border: `1px solid ${themeVars.color.grey100}`,
  gap: '0.4rem',
  width: '11.2rem',
  height: '4rem',
});

export const optionContainer = style({
  position: 'relative',
});

export const optionItem = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 0 1px transparent',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },

  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.white,
        boxShadow: `inset 0 0 0 1px ${themeVars.color.grey300}, 0 0 4px rgba(0, 0, 0, 0.05)`,
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
