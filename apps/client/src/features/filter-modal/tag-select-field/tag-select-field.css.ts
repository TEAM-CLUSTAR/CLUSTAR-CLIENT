import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const field = recipe({
  base: {
    display: 'flex',
    padding: '0.8rem',
    borderRadius: '8px',
    backgroundColor: themeVars.color.grey50,
    border: '1px solid transparent',
  },
  variants: {
    isActive: {
      true: {
        borderColor: themeVars.color.blue500,
      },
      false: {
        borderColor: themeVars.color.grey300,
      },
    },
  },
});

export const placeholder = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey500,
});

export const tagList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  flex: 1,
  minWidth: 0,
});
