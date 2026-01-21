import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const modalContainer = style({
  width: '40rem',
  height: '22.8rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '16px',
  padding: '5.6rem 4.4rem 4.3rem 4.4rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  alignItems: 'center',
});

export const modalTitle = style({
  ...themeVars.fontStyles.title_m_20,
});

export const modalContent = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey600,
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1.2rem',
  marginTop: '3.2rem',
  width: '100%',
});
