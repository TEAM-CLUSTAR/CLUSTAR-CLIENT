import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    isolation: 'isolate',
    width: '17.2rem',
    height: '5.6rem',
    gap: '0.2rem',
    border: '2px solid transparent',
    borderRadius: '100px',
    color: themeVars.color.white,
    ...themeVars.fontStyles.title_sb_18,
  },

  variants: {
    isActive: {
      false: {
        backgroundColor: themeVars.color.blue500,
        boxShadow:
          '0 1rem 1.5rem -0.3rem rgba(0, 0, 0, 0.10), 0 0.4rem 0.6rem -0.4rem rgba(0, 0, 0, 0.10)',
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.blue700,
          },
        },
      },
      true: {
        boxShadow: '0 0 1rem 0 rgba(34, 15, 93, 0.40)',
        selectors: {
          '&::before': {
            position: 'absolute',
            inset: '-2px',
            zIndex: themeVars.zIndex['z-deep'],
            borderRadius: '100px',
            background: themeVars.color.gradient02,
            pointerEvents: 'none',
            content: '""',
          },
          '&::after': {
            position: 'absolute',
            inset: '-2px',
            zIndex: themeVars.zIndex['z-back'],
            border: '2px solid transparent',
            borderRadius: '100px',
            background: themeVars.color.gradient01,
            backgroundClip: 'content-box',
            pointerEvents: 'none',
            content: '""',
          },
        },
      },
    },
  },

  defaultVariants: {
    isActive: false,
  },
});
