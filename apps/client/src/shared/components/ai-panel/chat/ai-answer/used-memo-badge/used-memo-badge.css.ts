import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  ...themeVars.fontStyles.label_m_12,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  width: 'fit-content',
  padding: '0.4rem 0.8rem',
  borderRadius: '0.4rem',
  color: themeVars.color.grey700,
  backgroundColor: themeVars.color.grey100,
});
