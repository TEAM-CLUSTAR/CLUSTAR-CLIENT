import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '16px',
  padding: '1.8rem 2rem',
  border: `1px solid ${themeVars.color.grey300}`,
  selectors: {
    '&::after': {
      opacity: 0,
      content: '""',
      position: 'absolute',
      inset: '-0.1rem',
      padding: '0.15rem',
      borderRadius: 'calc(16px + 0.1rem)',
      pointerEvents: 'none',
      background: themeVars.color.gradient02,

      WebkitMask:
        'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      transition: `opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
    '&:focus-within': {
      borderColor: 'transparent',
    },
    '&:focus-within::after': {
      opacity: 1,
    },
  },
});

export const textarea = style({
  width: '100%',
  height: '7.2rem',
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...themeVars.fontStyles.body_m_16,
  backgroundColor: 'transparent',
  selectors: {
    '&:focus::placeholder': {
      color: 'transparent',
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
