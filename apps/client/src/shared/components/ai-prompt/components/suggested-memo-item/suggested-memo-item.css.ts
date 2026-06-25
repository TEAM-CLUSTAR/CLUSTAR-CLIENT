import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  width: '41.6rem',
  height: '3.6rem',
  padding: '0 0.4rem',
  borderRadius: '8px',
  overflow: 'hidden',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const memo = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey800,
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const addMemo = style({
  borderRadius: '4px',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey200,
    },
  },
});
