import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    display: 'flex',
    width: '100%',
    height: '4rem',
    gap: '0.8rem',
    alignItems: 'center',
    padding: '0 0.4rem',
    borderRadius: '0 0.8rem 0.8rem 0',
    ...themeVars.fontStyles.body_sb_16,
    color: themeVars.color.grey700,
    cursor: 'hover',

    selectors: {
      '&:hover': {
        backgroundColor: themeVars.color.grey200,
        borderLeft: `2px solid ${themeVars.color.grey400}`,
      },
    },
  },

  variants: {
    state: {
      selected: {
        color: themeVars.color.blue500,
        backgroundColor: themeVars.color.blue100,
        borderLeft: `2px solid ${themeVars.color.blue500}`,
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.blue100,
            borderLeft: `2px solid ${themeVars.color.blue500}`,
          },
        },
      },
    },
  },
});
