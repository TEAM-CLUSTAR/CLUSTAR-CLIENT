import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  padding: '0 0.6rem',
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.grey700,
  borderRadius: '4px',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.grey200,
  },
});
