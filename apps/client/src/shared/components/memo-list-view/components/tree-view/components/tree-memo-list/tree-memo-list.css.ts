import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    padding: '1.8rem',
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '1.1rem',
    borderRadius: '8px',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.35)',
  },

  variants: {
    labelColor: {
      blue: { backgroundColor: themeVars.color.label04 },
      green: { backgroundColor: themeVars.color.label06 },
      pink: { backgroundColor: themeVars.color.label08 },
      purple: { backgroundColor: themeVars.color.label02 },
      grey: { backgroundColor: themeVars.color.grey300 },
    },
  },
});

export const title = recipe({
  base: {
    ...themeVars.fontStyles.title_sb_18,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  variants: {
    labelColor: {
      blue: { color: themeVars.color.label03 },
      green: { color: themeVars.color.label05 },
      pink: { color: themeVars.color.label07 },
      purple: { color: themeVars.color.label01 },
      grey: { color: themeVars.color.grey600 },
    },
  },
});

export const memosContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});
