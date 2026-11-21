import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography } from '@cds/token/v2';

export const notice = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  gap: spacing[8],
  padding: spacing[12],
  marginBottom: spacing[8],
  borderRadius: radius.md,
  backgroundColor: color.bg.brand_subtle,
});

export const noticeText = style({
  ...typography.label_md,
  color: color.text.primary,
});
