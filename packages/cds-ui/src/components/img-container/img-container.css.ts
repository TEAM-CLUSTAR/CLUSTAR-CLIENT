import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  width: '36rem',
  height: '21.4rem',
  backgroundColor: themeVars.color.grey200,
  border: `1px solid ${themeVars.color.white}`,
  borderRadius: '12px',
});
