import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.2rem',
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey800,
  paddingLeft: '0.4rem',
  paddingRight: '1.2rem',
});

export const actions = style({
  display: 'flex',
  marginLeft: 'auto',
});

export const actionContainer = style({
  position: 'relative',
});

export const actionButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '8px',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const tooltip = style({
  position: 'absolute',
  right: 0,
  bottom: 'calc(100% + 0.8rem)',
  zIndex: themeVars.zIndex.modalContent,
});

export const content = style({
  width: '100%',
  padding: '1.6rem 1.8rem',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  whiteSpace: 'pre-wrap',
});
