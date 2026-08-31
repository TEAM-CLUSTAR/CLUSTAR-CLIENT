import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const searchContainer = style({
  display: 'flex',
  gap: '0.4rem',
  padding: '0 1.2rem',
  width: '100%',
  border: `1px solid ${themeVars.color.grey400}`,
  borderRadius: '100px',
  backgroundColor: themeVars.color.grey100,
});

export const input = style({
  ...themeVars.fontStyles.title_m_18,
  flex: 1,
  color: themeVars.color.grey600,
  backgroundColor: 'transparent',
  outline: 'none',

  '::placeholder': {
    color: themeVars.color.grey600,
  },
});
