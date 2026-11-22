import { style } from '@vanilla-extract/css';

import { color, radius } from '@cds/token/v2';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
});

export const box = style({
  appearance: 'none',
  width: '1.6rem',
  height: '1.6rem',
  margin: 0,
  boxSizing: 'border-box',
  borderRadius: radius.sm,
  border: `1.5px solid ${color.border.strong}`,
  backgroundColor: color.bg.canvas,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',

  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: color.border.brand,
    },
    '&:checked': {
      borderColor: color.bg.brand,
      backgroundColor: color.bg.brand,
    },
    '&:checked:hover:not(:disabled)': {
      borderColor: color.bg.brand_hover,
      backgroundColor: color.bg.brand_hover,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      borderColor: color.border.default,
      backgroundColor: color.bg.muted,
    },
    '&:checked:disabled': {
      borderWidth: '1px',
    },
    '&:focus-visible': {
      outline: `2px solid ${color.border.focus}`,
      outlineOffset: '1px',
    },
  },
});

export const mark = style({
  position: 'absolute',
  pointerEvents: 'none',
  visibility: 'hidden',

  selectors: {
    [`${box}:checked + &`]: {
      visibility: 'visible',
    },
  },
});
