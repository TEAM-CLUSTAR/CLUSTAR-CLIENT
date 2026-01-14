import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  width: '100%',
  height: '100%',
  padding: '1.2rem 1.6rem',

  border: `1px solid ${themeVars.color.grey200}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.white,
  outline: 'none',
  resize: 'none',

  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,

  '::placeholder': {
    color: themeVars.color.grey500,
  },
});
