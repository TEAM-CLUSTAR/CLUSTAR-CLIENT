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
        width: '3.2rem',
        height: '3.2rem',
        borderRadius: '8px',
      },
      md: {
        width: '12rem',
        height: '3.6rem',
        borderRadius: '8px',
        ...themeVars.fontStyles.body_m_16,
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
        backgroundColor: themeVars.color.grey400,
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
        backgroundColor: themeVars.color.white,
        color: themeVars.color.grey700,
        border: `1px solid ${themeVars.color.grey400}`,
      },
    },
    {
      variants: { size: 'md', disabled: true },
      style: {
        backgroundColor: themeVars.color.grey600,
        color: themeVars.color.white,
        border: 'none',
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
        border: `1px solid ${themeVars.color.grey400}`,
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
