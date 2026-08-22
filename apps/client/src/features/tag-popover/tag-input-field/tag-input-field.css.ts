import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const field = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '0.15rem solid transparent',
  },
  variants: {
    isActive: {
      true: {
        borderColor: themeVars.color.blue500,
        backgroundColor: themeVars.color.grey50,
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export const tagList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  flex: 1,
  minWidth: 0,
});

export const input = style({
  ...themeVars.fontStyles.title_m_18,
  flex: 1,
  minWidth: 0,
  color: themeVars.color.grey800,
  backgroundColor: 'transparent',
  outline: 'none',

  '::placeholder': {
    color: themeVars.color.grey600,
  },
});
