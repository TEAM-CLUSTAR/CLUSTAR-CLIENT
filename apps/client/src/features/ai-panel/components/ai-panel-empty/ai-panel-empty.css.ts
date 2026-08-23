import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  flex: 1,
  minHeight: 0,
});

export const text = recipe({
  base: {
    ...themeVars.fontStyles.title_sb_24,
    color: themeVars.color.grey400,
  },
  variants: {
    isDragOver: {
      true: {
        color: themeVars.color.blue500,
      },
    },
  },
});
