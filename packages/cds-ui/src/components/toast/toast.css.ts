import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography, zIndex } from '@cds/token/v2';

export const toast = style({
  position: 'fixed',
  bottom: spacing[24],
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.modalContent,
  display: 'flex',
  alignItems: 'center',
  gap: spacing[12],
  padding: `${spacing[12]} ${spacing[16]}`,
  borderRadius: radius.md,
  backgroundColor: color.bg.inverse,
  filter: `drop-shadow(0 0.4rem 0.8rem ${color.shadow.color})`,
  ...typography.label_md,
  color: color.text.inverse,
});

export const action = style({
  textDecoration: 'underline',
});
