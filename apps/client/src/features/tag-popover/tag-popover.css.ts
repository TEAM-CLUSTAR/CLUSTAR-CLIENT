import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const panel = style({
  position: 'absolute',
  top: 'calc(100% + 0.4rem)',
  width: '100%',
  maxHeight: '31.2rem',
  padding: '1.4rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.grey300}`,
  borderRadius: '8px',
  boxShadow: '0 0 16px 4px rgba(0, 0, 0, 0.03)',
  overflow: 'hidden',
});

export const label = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey500,
});

export const contentContainer = style({
  display: 'flex',
  height: '25.6rem',
  gap: '1rem',
  marginTop: '1.2rem',
});

export const treeContainer = style({
  flex: 1,
  overflowY: 'auto',
});

export const createFieldButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  width: '100%',
  marginTop: '1rem',
  padding: '0 0.8rem',
  height: '3.6rem',
  backgroundColor: themeVars.color.grey100,
  borderRadius: '8px',
});

export const createText = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  whiteSpace: 'nowrap',
  overflowX: 'auto',
  minWidth: 0,
});
