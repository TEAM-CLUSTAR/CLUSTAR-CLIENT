import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const header = style({
  position: 'fixed',
  width: '100%',
  backgroundColor: themeVars.color.grey100,
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  height: '10.3rem',
  padding: '0 10rem',
  borderBottom: `1px solid ${themeVars.color.grey300}`,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20.5rem',
  backgroundColor: themeVars.color.grey100,
});

export const welcome = style({
  paddingBottom: '0.8rem',

  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey900,
});

export const description = style({
  paddingBottom: '4.8rem',

  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.grey700,
});

export const loginfile = style({
  width: '52rem',
  height: '35.6rem',
});

export const loginSection = style({
  width: '39.2rem',
});

export const login = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.1rem',
  width: '100%',
  padding: '2.8rem 0 2.8rem 0',
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

export const loginDescription = style({
  padding: '3.6rem 0 13.1rem 0',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
  textAlign: 'center',
});

export const point = style({
  textDecoration: 'underline',
  color: themeVars.color.grey700,
});
