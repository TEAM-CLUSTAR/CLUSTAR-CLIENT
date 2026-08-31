import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  width: '100%',
  padding: '1.2rem 1.4rem',
  border: 'none',
  borderRadius: '12px',
  textAlign: 'left',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: themeVars.color.grey100,
  },

  ':focus-visible': {
    outline: `2px solid ${themeVars.color.blue500}`,
    outlineOffset: '2px',
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.2rem',
  minWidth: 0,
});

export const mainInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flex: 1,
  minWidth: 0,
});

export const titleGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  flex: '0 1 auto',
  minWidth: 0,
});

export const memoIcon = style({
  flexShrink: 0,
});

export const title = style({
  ...themeVars.fontStyles.body_sb_16,
  minWidth: 0,
  color: themeVars.color.grey800,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const tagList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  flexShrink: 0,
  overflow: 'hidden',
});

export const openedAt = style({
  ...themeVars.fontStyles.label_m_12,
  flexShrink: 0,
  color: themeVars.color.grey400,
});

export const content = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
