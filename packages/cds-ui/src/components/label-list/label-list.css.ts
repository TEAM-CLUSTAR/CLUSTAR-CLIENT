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
    listType: {
      modal: {
        borderLeft: `3px solid ${themeVars.color.label03}`,
        padding: '0.3rem 0 0.3rem 1.6rem',
      },
      card: {},
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
