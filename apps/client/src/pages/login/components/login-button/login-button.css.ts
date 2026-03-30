import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',

  width: themeVars.width.full,
  height: '4.8rem',
  borderRadius: '12px',

  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.grey300}`,
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey800,
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.grey200,
  },
});

export const googleLogo = style({ width: '2.2rem', height: '2.2rem' });
