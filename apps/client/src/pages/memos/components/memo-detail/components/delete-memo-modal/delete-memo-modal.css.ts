import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  gap: '2.4rem',
  padding: '5.7rem 6.4rem 5rem',
  backgroundColor: themeVars.color.white,
  position: 'relative',
  width: '40rem',
  height: '22.8rem',
  boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.25)',
});

export const closeButton = style({
  position: 'absolute',
  top: '1.4rem',
  right: '1.2rem',
  padding: '0.4rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  alignItems: 'center',
});

export const title = style({
  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.grey800,
});

export const description = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey600,
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1.2rem',
  width: '100%',
});
