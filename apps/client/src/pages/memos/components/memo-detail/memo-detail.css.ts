import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '2.4rem',
  padding: '0 4rem 0 4rem',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
});

export const bodyGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const contentGroup = style({
  gap: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  paddingTop: '4rem',
  backgroundColor: themeVars.color.grey50,
});

export const title = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey800,
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none',
  padding: '1.2rem',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const content = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  padding: '1.2rem',
});

export const fileList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const imageGrid = style({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
  gap: '1.2rem',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  marginLeft: '-4rem',
  marginRight: '-4rem',
  paddingLeft: '4rem',
  paddingRight: '4rem',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const imageItem = style({
  position: 'relative',
  width: '294px',
  flexShrink: 0,
  aspectRatio: '294 / 186',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: themeVars.color.grey100,
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '2.4rem 4rem',
  flexShrink: 0,
});

export const date = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey700,
});

export const divider = style({
  width: '1px',
  height: '2rem',
  backgroundColor: themeVars.color.grey300,
});

export const count = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey700,
});

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: themeVars.color.grey100,
  },
});

export const hiddenInput = style({
  display: 'none',
});
