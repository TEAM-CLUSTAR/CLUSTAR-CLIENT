import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  minWidth: '16.6rem',
  maxWidth: '20rem',
  height: '6.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '1rem 2rem 1rem 1.4rem',
  border: `1px solid ${themeVars.color.grey300}`,
  borderRadius: '12px',
  backgroundColor: themeVars.color.white,
});

export const icon = style({
  flexShrink: 0,
});

export const fileContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const fileName = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey700,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const fileSize = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey500,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
