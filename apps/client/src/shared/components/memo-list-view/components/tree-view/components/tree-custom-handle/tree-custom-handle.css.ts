import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const handle = recipe({
  base: {
    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '50%',
  },
  variants: {
    labelColor: {
      blue: {
        backgroundColor: themeVars.color.label04,
        border: `2px solid ${themeVars.color.label03}`,
      },
      green: {
        backgroundColor: themeVars.color.label06,
        border: `2px solid ${themeVars.color.label05}`,
      },
      pink: {
        backgroundColor: themeVars.color.label08,
        border: `2px solid ${themeVars.color.label07}`,
      },
      purple: {
        backgroundColor: themeVars.color.label02,
        border: `2px solid ${themeVars.color.label01}`,
      },
      grey: {
        backgroundColor: themeVars.color.grey300,
        border: `2px solid ${themeVars.color.grey600}`,
      },
    },
  },
});

export const baseHandle = style({
  width: '1.2rem',
  height: '1.2rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.white,
  border: `2px solid ${themeVars.color.grey300}`,
});
