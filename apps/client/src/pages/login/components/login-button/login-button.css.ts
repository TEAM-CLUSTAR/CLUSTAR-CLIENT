import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography } from '@cds/token/v2';

export const container = style({
  ...typography.label_lg,

  display: 'flex',
  alignItems: 'center',

  width: '100%',
  minWidth: '7.2rem',
  height: '4rem',

  gap: spacing[6],
  padding: `0 ${spacing[12]}`,
  border: `1px solid ${color.border.default}`,
  borderRadius: radius.md,

  backgroundColor: color.bg.canvas,
  color: color.text.primary,

  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: color.bg.hover,
  },
});

export const googleLogo = style({
  display: 'block',
  width: '2rem',
  height: '2rem',
});

export const label = style({
  flex: 1,
  textAlign: 'center',
});

export const spacer = style({
  flexShrink: 0,
  width: '1px',
  height: '1px',
});
