import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const modalContent = style({
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.25)',
});

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40rem',
  height: '22.8rem',
  padding: '5.6rem 4.4rem 4.3rem',
});

export const closeButton = style({
  position: 'absolute',
  top: '1.4rem',
  right: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
});

export const title = style({
  ...themeVars.fontStyles.title_m_20,
  color: themeVars.color.grey800,
});

export const description = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey600,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '1.2rem',
  marginTop: '2.4rem',
});

export const buttonWrapper = style({
  width: '12.4rem',
});
