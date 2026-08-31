import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    boxSizing: 'border-box',
  },

  variants: {
    size: {
      sm: {
        width: '3.6rem',
        height: '3.6rem',
        borderRadius: '8px',
      },
      md: {
        width: '10.8rem',
        height: '3.2rem',
        borderRadius: '8px',
        position: 'relative',
        isolation: 'isolate',
        ...themeVars.fontStyles.label_sb_12,
      },
      lg: {
        width: '100%',
        minWidth: '12.4rem',
        height: '4rem',
        borderRadius: '8px',
        ...themeVars.fontStyles.title_sb_18,
      },
      xl: {
        width: '100%',
        height: '5.2rem',
        borderRadius: '12px',
        ...themeVars.fontStyles.title_sb_18,
      },
    },

    variant: {
      solid: {},
      outlined: {},
    },

    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {},
    },
    textSize: {
      sm: {},
      lg: {
        ...themeVars.fontStyles.title_sb_24,
      },
    },
  },

  compoundVariants: [
    {
      variants: { size: 'sm', disabled: false },
      style: {
        backgroundColor: themeVars.color.blue500,
        ':hover': { backgroundColor: themeVars.color.blue700 },
      },
    },
    {
      variants: { size: 'sm', disabled: true },
      style: {
        backgroundColor: themeVars.color.grey500,
      },
    },

    {
      variants: { size: 'md', variant: 'solid' },
      style: {
        backgroundColor: themeVars.color.blue500,
        color: themeVars.color.white,
        ':hover': { backgroundColor: themeVars.color.blue700 },
      },
    },

    {
      variants: { size: 'md', variant: 'outlined' },
      style: {
        border: '1px solid transparent',
        selectors: {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-1px',
            borderRadius: '8px',
            background: themeVars.color.gradient01,
            zIndex: themeVars.zIndex.deep,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '-1px',
            borderRadius: '8px',
            background: themeVars.color.gradient03,
            backgroundClip: 'content-box',
            border: '1px solid transparent',
            zIndex: themeVars.zIndex.back,
            pointerEvents: 'none',
          },
          '&:hover::after': {
            borderWidth: '2px',
            transition: 'border-width 0.1s ease',
          },
        },
      },
    },

    {
      variants: { size: 'lg', variant: 'solid' },
      style: {
        backgroundColor: themeVars.color.blue500,
        color: themeVars.color.white,
        ':hover': { backgroundColor: themeVars.color.blue700 },
        ':disabled': {
          backgroundColor: themeVars.color.grey500,
        },
      },
    },
    {
      variants: { size: 'lg', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: themeVars.color.grey700,
        border: `1px solid ${themeVars.color.grey700}`,
      },
    },
    {
      variants: { size: 'xl' },
      style: {
        backgroundColor: themeVars.color.blue500,
        color: themeVars.color.white,
        ':hover': { backgroundColor: themeVars.color.blue700 },
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    disabled: false,
  },
});

export const outlinedText = style({
  position: 'relative',
  zIndex: 1,
  backgroundImage: themeVars.color.gradient01,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
});
