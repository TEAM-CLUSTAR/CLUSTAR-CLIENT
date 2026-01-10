import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const button = style({
  width: '100%',
  height: '5.2rem',
  borderRadius: '1.2rem',
  backgroundColor: themeVars.color.blue500,
  color: themeVars.color.white,
  ...themeVars.fontStyles.title_sb_18,
});
