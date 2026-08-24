import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '82rem',
  height: '62rem',
  padding: '2rem 1.8rem',
  border: `1px solid ${themeVars.color.grey400}`,
  boxShadow: '0px 0px 24px 8px rgba(0, 0, 0, 0.03)',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '0.8rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const headerTitle = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const body = style({
  display: 'flex',
  gap: '1.2rem',
  flex: 1,
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const selectedLabel = style({
  margin: '1.6rem 0 0.8rem 0',
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey600,
});

export const treeScroll = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
});

export const footer = style({
  display: 'flex',
  gap: '0.8rem',
  justifyContent: 'flex-end',
  paddingTop: '0.8rem',
});
