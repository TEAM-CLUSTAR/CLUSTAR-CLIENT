import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const tabListContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const memoMarker = style({
  width: '5.2rem',
  height: '5.2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.white}`,
  backgroundColor: themeVars.color.grey50,
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.25)',
});

export const addButton = style({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: themeVars.color.grey300,
    borderRadius: '8px',
  },
});
