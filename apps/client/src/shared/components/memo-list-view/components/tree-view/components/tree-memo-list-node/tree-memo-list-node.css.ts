import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  padding: '1.8rem',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '1.1rem',
  borderRadius: '8px',
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.35)',
});

export const title = style({
  ...themeVars.fontStyles.title_sb_18,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const memosContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const handle = style({
  selectors: {
    '&.react-flow__handle': {
      width: '1.2rem',
      height: '1.2rem',
      borderRadius: '50%',
    },
  },
});
