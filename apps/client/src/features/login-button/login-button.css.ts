import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.4rem',

  width: '39.2rem',
  height: '4.8rem',
  borderRadius: '1.2rem',

  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.grey300}`,
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey800,
});
