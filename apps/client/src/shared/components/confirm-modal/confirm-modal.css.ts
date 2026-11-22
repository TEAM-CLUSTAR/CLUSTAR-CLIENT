import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography } from '@cds/token/v2';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  width: '36rem',
  padding: spacing[24],
  borderRadius: radius.xl,
  backgroundColor: color.bg.elevated,
  boxShadow: `0 0.8rem 3.2rem 0 ${color.shadow.color}`,
  boxSizing: 'border-box',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
});

export const title = style({
  ...typography.title_lg,
  flex: 1,
  minWidth: 0,
  color: color.text.primary,
  wordBreak: 'break-word',
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: radius.sm,
  selectors: {
    '&:hover': { backgroundColor: color.bg.hover },
  },
});

export const description = style({
  ...typography.body_md,
  color: color.text.secondary,
  wordBreak: 'break-word',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: spacing[8],
});
