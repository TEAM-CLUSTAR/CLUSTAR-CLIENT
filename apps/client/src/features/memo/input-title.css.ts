import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  width: '100%',
  height: '4.3rem',
  padding: '1rem 1.6rem',

  border: `1px solid ${themeVars.color.grey200}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.white,
  resize: 'none',

  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey500,

  '::placeholder': {
    color: themeVars.color.grey500,
  },
});
