import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const PRIMARY_COLOR_VAR = '--card-primary-color';

export const tabContainer = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '1.2rem',
    height: '4.4rem',
    width: '15rem',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: `0 0 4px 0 ${themeVars.color.grey400}`,
    backgroundColor: themeVars.color.grey50,
    overflow: 'hidden',

    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '4px',
        height: '100%',
        backgroundColor: `var(${PRIMARY_COLOR_VAR})`,
        pointerEvents: 'none',

        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 180ms cubic-bezier(0.4, 0, 0.2, 1)',
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '8px',
        pointerEvents: 'none',
        boxShadow: `inset 0 0 0 2px ${themeVars.color.white}`,
        transition:
          'box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 180ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '&:hover::after': {
        boxShadow: `inset 0 0 0 2px ${themeVars.color.grey400}`,
      },
    },
  },

  variants: {
    isSelected: {
      true: {
        borderRadius: `0 8px 8px 0`,
        backgroundColor: themeVars.color.white,

        selectors: {
          '&::before': { transform: 'scaleX(1)' },
          '&::after': {
            boxShadow: 'none',
            borderRadius: `0 8px 8px 0`,
          },
          '&:hover::after': {
            boxShadow: 'none',
          },
        },
      },

      false: {},
    },
  },
});

export const buttonTextContainer = style({
  ...themeVars.fontStyles.title_m_18,
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '0.8rem 0.4rem 0.8rem 2.4rem',
  flex: '1',
});

export const deleteButton = style({
  ':hover': {
    backgroundColor: themeVars.color.grey200,
    borderRadius: '8px',
  },
});
