import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  gap: '0.8rem',
  width: '100%',
  height: '4rem',
  alignItems: 'center',
  padding: '0 0.4rem',
  borderRadius: '0 0.8rem 0.8rem 0',
  ...themeVars.fontStyles.body_sb_16,
});
