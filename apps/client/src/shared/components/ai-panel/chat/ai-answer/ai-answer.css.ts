import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.2rem',
});

export const headerLeft = style({
  display: 'flex',
  gap: '1.2rem',
});

export const summary = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const summaryText = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const memoChip = style({
  display: 'flex',
  gap: '0.4rem',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  backgroundColor: themeVars.color.grey100,
  color: themeVars.color.grey700,
  ...themeVars.fontStyles.label_m_12,
});

export const actions = style({
  display: 'flex',
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
});

export const content = style({
  width: '100%',
  padding: '1.6rem 1.8rem',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
});

globalStyle(`${content} strong`, {
  fontWeight: themeVars.fontStyles.body_sb_16.fontWeight,
});

globalStyle(`${content} ul`, {
  margin: '0.6rem 0',
  paddingLeft: '1.8rem',
  listStyle: 'disc',
});

globalStyle(`${content} ol`, {
  margin: '0.6rem 0',
  paddingLeft: '1.8rem',
  listStyle: 'decimal',
});

globalStyle(`${content} li`, {
  margin: '0.3rem 0',
});

globalStyle(`${content} li > p`, {
  margin: 0,
});

globalStyle(`${content} hr`, {
  margin: '1.2rem 0',
  borderColor: themeVars.color.grey200,
});

globalStyle(`${content} blockquote`, {
  margin: '0.6rem 0',
  padding: '0 0 0 1.2rem',
  borderLeft: `3px solid ${themeVars.color.grey300}`,
  color: themeVars.color.grey600,
});

globalStyle(`${content} blockquote > p`, {
  margin: 0,
});
