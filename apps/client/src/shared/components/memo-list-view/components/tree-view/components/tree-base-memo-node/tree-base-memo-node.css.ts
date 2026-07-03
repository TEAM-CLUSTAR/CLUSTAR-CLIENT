import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  width: '23.2rem',
  padding: '0.8rem 1.4rem',
  border: `1.5px solid ${themeVars.color.grey300}`,
  backgroundColor: themeVars.color.white,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.20)',
  borderRadius: '8px',
});

export const text = style({
  ...themeVars.fontStyles.body_sb_16,
  color: themeVars.color.grey700,
  textAlign: 'left',
  width: '100%',
});

export const handle = style({
  selectors: {
    '&.react-flow__handle': {
      width: '1.2rem',
      height: '1.2rem',
      borderRadius: '50%',
      backgroundColor: themeVars.color.white,
      border: `2px solid ${themeVars.color.grey300}`,
    },
  },
});
