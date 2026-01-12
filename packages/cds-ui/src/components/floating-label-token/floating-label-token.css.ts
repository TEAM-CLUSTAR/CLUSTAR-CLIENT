import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  width: '100%',
  padding: '0 0.6rem',
  borderRadius: '4px',
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.grey700,
  textAlign: 'start',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: themeVars.color.grey200,
  },
});
