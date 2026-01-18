import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const header = style({
  display: 'flex',
  height: '10.3rem',

  gap: '1.2rem',
  padding: '0 10rem',

  alignItems: 'center',
  borderBottom: `1px solid ${themeVars.color.grey300}`,
});
