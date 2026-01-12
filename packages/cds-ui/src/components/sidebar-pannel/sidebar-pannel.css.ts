import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',

    width: '100%',
    height: '4rem',
    padding: '0 0.4rem',

    borderLeft: '2px solid transparent',
    borderRadius: '0 8px 8px 0',

    ...themeVars.fontStyles.body_sb_16,
    transition: `background-color 0.2s,
      border-left-color 0.2s,
      color 0.2s ease`,
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
