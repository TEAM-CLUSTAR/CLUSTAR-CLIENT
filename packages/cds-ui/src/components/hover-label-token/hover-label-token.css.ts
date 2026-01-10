import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  padding: '0px 6px',
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.grey700,
  height: '2.1rem',
  borderRadius: '4px',

  ':hover': {
    backgroundColor: themeVars.color.grey200,
  },
});
