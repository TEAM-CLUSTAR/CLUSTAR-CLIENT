import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1.8rem',

  padding: '2.4rem',
  width: '34rem',
  height: '22rem',
  borderRadius: '12px',
  backgroundColor: themeVars.color.white,
});

export const mainInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.2rem',
});

export const tagContainer = style({
  display: 'flex',
  gap: '0.8rem',
});

export const contentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.1rem',
});

export const content = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey700,
  whiteSpace: 'wrap',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const subInfoContainer = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const countContainer = style({
  display: 'flex',
  gap: '0.4rem',
});

export const count = style({
  display: 'flex',
  alignItems: 'center',
});
