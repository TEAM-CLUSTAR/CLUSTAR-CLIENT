import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography } from '@cds/token/v2';

// TODO: 다른 모달 리디자인이 확정되면 스타일 다시 체크
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

export const title = style({
  ...typography.title_lg,
  color: color.text.primary,
});

export const description = style({
  ...typography.body_md,
  color: color.text.secondary,
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: spacing[8],
});
