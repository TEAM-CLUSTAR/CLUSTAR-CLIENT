import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const TAG_CONTAINER_COLORS = {
  blue: {
    color: themeVars.color.sub03,
    backgroundColor: themeVars.color.sub04,
  },
  purple: {
    color: themeVars.color.sub01,
    backgroundColor: themeVars.color.sub02,
  },
  green: {
    color: themeVars.color.sub05,
    backgroundColor: themeVars.color.sub06,
  },
  pink: {
    color: themeVars.color.sub07,
    backgroundColor: themeVars.color.sub08,
  },
  aiBlue: {
    color: themeVars.color.blue500,
    border: '1px solid transparent',
    backgroundImage: `linear-gradient(${themeVars.color.blue50}, ${themeVars.color.blue50}), ${themeVars.color.gradient02}`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  },
  grey: {
    color: themeVars.color.grey700,
    backgroundColor: themeVars.color.grey200,
  },
} as const;

const TAG_INDICATOR_COLORS = {
  blue: { backgroundColor: themeVars.color.sub03 },
  purple: { backgroundColor: themeVars.color.sub01 },
  green: { backgroundColor: themeVars.color.sub05 },
  pink: { backgroundColor: themeVars.color.sub07 },
  aiBlue: { backgroundColor: themeVars.color.blue500 },
  grey: { display: 'none' },
} as const;

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    borderRadius: '4px',
    width: 'fit-content',
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
      false: {
        cursor: 'default',
      },
    },
    size: {
      lg: {
        ...themeVars.fontStyles.body_m_14,
        height: '2.4rem',
        padding: '0 0.8rem',
      },
      sm: {
        ...themeVars.fontStyles.label_m_12,
        height: '1.8rem',
        lineHeight: 1,
        padding: '0 0.6rem',
        textTransform: 'lowercase',
      },
    },
    color: TAG_CONTAINER_COLORS,
  },
  compoundVariants: [
    {
      variants: { size: 'sm', color: 'aiBlue' },
      style: { textTransform: 'none' },
    },
  ],
});

export const indicator = recipe({
  variants: {
    size: {
      lg: {
        width: '0.8rem',
        height: '0.8rem',
        borderRadius: '2px',
      },
      sm: {
        width: '0.6rem',
        height: '0.6rem',
        borderRadius: '1px',
      },
    },
    color: TAG_INDICATOR_COLORS,
  },
});
