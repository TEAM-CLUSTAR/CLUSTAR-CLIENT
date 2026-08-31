import { style } from '@vanilla-extract/css';

import { slideInUp } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const actionButtons = style({
  display: 'flex',
  gap: '0.8rem',
  justifyContent: 'flex-end',
  animation: `${slideInUp} 0.7s ease-in-out`,
});
