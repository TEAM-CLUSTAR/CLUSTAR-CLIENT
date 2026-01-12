import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    borderRadius: '8px',
    transition: `background-color 0.2s,`,
  },

  variants: {
    isSelected: {
      false: {
        color: themeVars.color.grey700,
        ':hover': {
          backgroundColor: themeVars.color.grey200,
          borderLeftColor: themeVars.color.grey400,
        },
      },
      true: {
        backgroundColor: themeVars.color.blue100,
        borderLeftColor: themeVars.color.blue500,
        color: themeVars.color.blue500,
      },
    },
  },
});
