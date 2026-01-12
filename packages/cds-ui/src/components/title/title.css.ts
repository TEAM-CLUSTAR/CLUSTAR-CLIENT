import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const titleText = style({
  ...themeVars.fontStyles.title_sb_18,
  color: themeVars.color.grey900,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
