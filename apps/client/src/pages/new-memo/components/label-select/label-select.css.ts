import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeIn, themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
});

export const selectBox = recipe({
  base: {
    display: 'flex',
    width: '100%',
    height: '5.2rem',

    padding: '0.8rem',
    alignItems: 'center',
    gap: '0.8rem',

    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    outline: 'none',

    transition:
      'border 0.2s ease, background-color 0.2s ease, border-radius 0.2s ease',

    ':hover': {
      backgroundColor: themeVars.color.grey200,
    },
  },

  variants: {
    isOpen: {
      true: {
        backgroundColor: themeVars.color.grey50,
        borderRadius: '8px 8px 0 0',
        border: `1px solid ${themeVars.color.grey300}`,

        ':hover': {
          backgroundColor: themeVars.color.grey50,
        },
      },
    },
  },
});

export const chipContainer = style({
  display: 'flex',
  gap: '0.8rem',
});

export const placeholder = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey700,
});

export const dropdown = style({
  position: 'absolute',
  zIndex: themeVars.zIndex.button,

  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',

  padding: '1.8rem 1.4rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '0 0 0.8rem 0.8rem',
  border: `1px solid ${themeVars.color.grey300}`,
  borderTop: 'none',

  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  animation: `${fadeIn} 0.2s ease-out`,
});

export const labelText = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
});
