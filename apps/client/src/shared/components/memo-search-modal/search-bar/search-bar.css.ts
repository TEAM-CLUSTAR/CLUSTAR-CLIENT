import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  width: '100%',
  padding: '2rem 2.4rem',
  borderBottom: `1px solid ${themeVars.color.grey100}`,
});

export const input = style({
  ...themeVars.fontStyles.body_m_16,
  flex: 1,
  color: themeVars.color.grey800,
  backgroundColor: 'transparent',
  outline: 'none',

  '::placeholder': {
    color: themeVars.color.grey600,
  },

  '::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
  },
});
