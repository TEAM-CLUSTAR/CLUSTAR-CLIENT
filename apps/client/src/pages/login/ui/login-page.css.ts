import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({ height: '100vh' });

export const loginfile = style({
  width: '52rem',
  height: '35.6rem',
});

export const content = style({
  height: 'calc(100vh - 10.3rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const welcome = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey900,
  paddingBottom: '0.8rem',
});

export const description = style({
  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.grey700,
  paddingBottom: '4.8rem',
});

export const loginSection = style({
  width: '100%',
  paddingTop: '2.7rem',
});

export const login = style({
  width: '100%',
  display: 'flex',
  gap: '1.1rem',
  alignItems: 'center',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,

  '::before': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: themeVars.color.grey300,
  },

  '::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: themeVars.color.grey300,
  },
});

export const loginDeesctiption = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
  textAlign: 'center',
  paddingTop: '3.6rem',
});

export const point = style({
  textDecoration: 'underline',
});
