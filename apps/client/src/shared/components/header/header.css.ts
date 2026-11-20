import { style } from '@vanilla-extract/css';

import { color, spacing, typography } from '@cds/token/v2';

export const header = style({
  display: 'flex',
  gap: spacing[8],
  padding: `${spacing[20]} 0`,
});

export const titleGroup = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  gap: spacing[8],
});

export const title = style({
  ...typography.title_md,
  color: color.text.primary,
});

export const count = style({
  ...typography.label_md,
  color: color.text.tertiary,
});
