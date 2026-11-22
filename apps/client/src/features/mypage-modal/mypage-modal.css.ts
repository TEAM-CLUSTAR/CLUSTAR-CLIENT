import { style } from '@vanilla-extract/css';

import { color, radius, shadow, spacing, typography } from '@cds/token/v2';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  width: '48rem',
  padding: spacing[24],
  borderRadius: radius.xl,
  backgroundColor: color.bg.elevated,
  boxShadow: shadow.modal,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
});

export const title = style({
  ...typography.title_lg,
  flex: 1,
  minWidth: 0,
  color: color.text.primary,
});

export const closeButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: radius.sm,
  ':hover': {
    backgroundColor: color.bg.hover,
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[20],
});

export const accountSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[12],
});

export const sectionTitle = style({
  ...typography.label_sm,
  color: color.text.tertiary,
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
});

export const avatar = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: radius.full,
  overflow: 'hidden',
  backgroundColor: color.bg.brand_subtle,
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const avatarInitial = style({
  ...typography.title_sm,
  color: color.text.brand,
});

export const rowText = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  gap: spacing[2],
  whiteSpace: 'nowrap',
});

export const rowTitle = style({
  ...typography.label_md,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: color.text.primary,
});

export const rowDescription = style({
  ...typography.label_sm,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: color.text.tertiary,
});

export const divider = style({
  width: '100%',
  height: '1px',
  margin: 0,
  border: 'none',
  backgroundColor: color.border.subtle,
});
