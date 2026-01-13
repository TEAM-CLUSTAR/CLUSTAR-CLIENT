import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'inline-flex',
  height: '2.8rem',
  padding: '0.4rem 0.8rem',
  alignItems: 'center',
  border: `1px solid ${themeVars.color.white}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey50,
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.grey700,
});
