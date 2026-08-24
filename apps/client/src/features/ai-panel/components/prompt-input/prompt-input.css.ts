import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: themeVars.color.white,
    borderRadius: '12px',
    padding: '1.6rem 1.8rem',
    border: `1px solid ${themeVars.color.grey300}`,
    transition: 'border-color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
    selectors: {
      '&:focus-within': {
        borderColor: themeVars.color.blue500,
      },
    },
  },
  variants: {
    isDragOver: {
      true: {
        borderStyle: 'dashed',
        borderColor: themeVars.color.grey400,
      },
      false: {},
    },
  },
});

export const memoList = style({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '0.8rem',
  width: '100%',
  overflowX: 'auto',
});

export const textarea = style({
  width: '100%',
  minHeight: '6.6rem',
  maxHeight: '19.2rem',
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  backgroundColor: 'transparent',
  selectors: {
    '&::placeholder': {
      color: themeVars.color.grey500,
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
