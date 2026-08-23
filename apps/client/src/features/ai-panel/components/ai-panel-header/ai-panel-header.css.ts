import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '7.2rem',
  padding: '0 2rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const titleGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const title = style({
  ...themeVars.fontStyles.body_sb_16,
  color: themeVars.color.grey700,
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
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
  color: themeVars.color.grey700,
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const tooltip = style({
  position: 'absolute',
  top: 'calc(100% + 0.8rem)',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: themeVars.zIndex.modalContent,
});
