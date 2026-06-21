import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0.8rem 1.2rem',
  border: `1px solid ${themeVars.color.grey200}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey700,
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)',
});

export const title = style({
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.white,
});

export const description = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey200,
});
