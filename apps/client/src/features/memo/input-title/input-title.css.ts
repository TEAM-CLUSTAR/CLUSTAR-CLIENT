import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  width: '100%',
  height: '4.3rem',
  padding: '1rem 1.6rem',

  border: `1px solid ${themeVars.color.grey200}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.white,

  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey900,

  outline: 'none',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '::placeholder': {
    color: themeVars.color.grey500,
  },
  ':focus': {
    borderColor: themeVars.color.blue400,
  },
});
