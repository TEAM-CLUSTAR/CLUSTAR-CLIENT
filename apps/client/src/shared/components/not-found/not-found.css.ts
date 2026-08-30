import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const layout = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: themeVars.color.grey50,
});
