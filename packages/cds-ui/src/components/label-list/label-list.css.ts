import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const labelListContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  variants: {
    type: {
      dense: {
        borderLeft: `3px solid ${themeVars.color.label03}`,
        paddingLeft: '1.6rem',
      },
      regular: {},
    },
  },
});

export const dateTextContainer = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey500,
});

export const labelContainer = style({
  display: 'flex',
  gap: '0.8rem',
});
