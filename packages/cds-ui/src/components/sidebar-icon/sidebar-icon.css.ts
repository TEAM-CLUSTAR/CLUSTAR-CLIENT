import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',
  },

  variants: {
    isSelected: {
      false: {
        ':hover': {
          backgroundColor: themeVars.color.grey200,
        },
      },
      true: {
        backgroundColor: themeVars.color.blue100,
      },
    },
  },
});
