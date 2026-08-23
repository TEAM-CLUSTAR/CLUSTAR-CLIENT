import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  width: '26.4rem',
  padding: '1.4rem 2rem',
  borderRadius: '3px',
  backgroundColor: themeVars.color.white,
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.25)',
  transition: 'background-color 0.2s ease',

  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey200,
    },
  },
});

export const title = style({
  width: '100%',
  overflow: 'hidden',
  ...themeVars.fontStyles.body_sb_16,
  color: themeVars.color.grey900,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});

export const content = style({
  width: '100%',
  overflow: 'hidden',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey700,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'left',
});
