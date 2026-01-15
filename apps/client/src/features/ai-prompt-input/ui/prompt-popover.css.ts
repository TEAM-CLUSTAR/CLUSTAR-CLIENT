import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const popoverContainer = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: 'max-content',
  padding: '0.8rem 1.2rem',
  backgroundColor: themeVars.color.grey700,
  border: `1px solid ${themeVars.color.grey200}`,
  borderRadius: '8px',
});

export const title = style({
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.white,
});

export const description = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey200,
});
