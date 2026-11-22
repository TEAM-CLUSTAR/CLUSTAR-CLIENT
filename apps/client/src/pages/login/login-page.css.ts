import { style } from '@vanilla-extract/css';

import { color, radius, spacing, typography } from '@cds/token/v2';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  overflow: 'hidden',
  backgroundColor: color.bg.subtle,

  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    opacity: 0.6,

    backgroundImage: `radial-gradient(circle, ${color.border.default} 0.2075rem, transparent 0.2075rem)`,
    backgroundSize: '4.15rem 4.15rem',
    backgroundPosition: '1.6575rem -0.4675rem',
    pointerEvents: 'none',
  },
});

export const main = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const loginSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[24],
  width: '34rem',
  padding: `${spacing[32]} ${spacing[24]} ${spacing[64]}`,
  overflow: 'hidden',
  backgroundColor: color.bg.elevated,
  border: `0.1316rem solid ${color.border.subtle}`,
  borderRadius: radius.xl,
});

export const titleDescriptionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[2],
  whiteSpace: 'nowrap',
});

export const title = style({
  ...typography.title_lg,
  color: color.text.primary,
});

export const description = style({
  ...typography.body_md,
  color: color.text.secondary,
});

export const infoText = style({
  ...typography.label_sm,
  textAlign: 'center',
  color: color.text.secondary,
});

export const infoLink = style({
  textDecoration: 'underline',
  textUnderlinePosition: 'from-font',
});

export const googleLogo = style({
  display: 'block',
  width: '2rem',
  height: '2rem',
});
