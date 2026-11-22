import { style } from '@vanilla-extract/css';

import { color } from '@cds/token/v2';

export const background = style({
  position: 'relative',
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
