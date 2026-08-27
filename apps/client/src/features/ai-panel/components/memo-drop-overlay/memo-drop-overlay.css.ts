import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const overlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: themeVars.zIndex.panelOverlay,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  borderRadius: '12px',
  border: `2px dashed ${themeVars.color.grey500}`,
  backgroundColor: themeVars.color.opacity90,
});

export const iconBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.4rem',
  height: '4.4rem',
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.grey400}`,
  backgroundColor: themeVars.color.white,
});

export const text = style({
  ...themeVars.fontStyles.title_m_20,
  color: themeVars.color.grey800,
});
