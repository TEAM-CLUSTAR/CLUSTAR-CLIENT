import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  width: '100%',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.grey100,
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
  flexShrink: 0,
});
