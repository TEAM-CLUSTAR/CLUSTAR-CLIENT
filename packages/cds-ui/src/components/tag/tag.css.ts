import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const TAG_CONTAINER_COLORS = {
  pink: {
    color: themeVars.color.sub_pink_500,
    backgroundColor: themeVars.color.sub_pink_100,
  },
  red: {
    color: themeVars.color.sub_red_500,
    backgroundColor: themeVars.color.sub_red_100,
  },
  orange: {
    color: themeVars.color.sub_orange_500,
    backgroundColor: themeVars.color.sub_orange_100,
  },
  yellow: {
    color: themeVars.color.sub_yellow_500,
    backgroundColor: themeVars.color.sub_yellow_100,
  },
  green: {
    color: themeVars.color.sub_green_500,
    backgroundColor: themeVars.color.sub_green_100,
  },
  cyan: {
    color: themeVars.color.sub_cyan_500,
    backgroundColor: themeVars.color.sub_cyan_100,
  },
  lightBlue: {
    color: themeVars.color.sub_lightBlue_500,
    backgroundColor: themeVars.color.sub_lightBlue_100,
  },
  blue: {
    color: themeVars.color.sub_blue_500,
    backgroundColor: themeVars.color.sub_blue_100,
  },
  purple: {
    color: themeVars.color.sub_purple_500,
    backgroundColor: themeVars.color.sub_purple_100,
  },
  magenta: {
    color: themeVars.color.sub_magenta_500,
    backgroundColor: themeVars.color.sub_magenta_100,
  },
  gradient: {
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
  pink: { backgroundColor: themeVars.color.sub_pink_500 },
  red: { backgroundColor: themeVars.color.sub_red_500 },
  orange: { backgroundColor: themeVars.color.sub_orange_500 },
  yellow: { backgroundColor: themeVars.color.sub_yellow_500 },
  green: { backgroundColor: themeVars.color.sub_green_500 },
  cyan: { backgroundColor: themeVars.color.sub_cyan_500 },
  lightBlue: { backgroundColor: themeVars.color.sub_lightBlue_500 },
  blue: { backgroundColor: themeVars.color.sub_blue_500 },
  purple: { backgroundColor: themeVars.color.sub_purple_500 },
  magenta: { backgroundColor: themeVars.color.sub_magenta_500 },
  gradient: { backgroundColor: themeVars.color.blue500 },
  grey: { display: 'none' },
} as const;

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    borderRadius: '4px',
    width: 'fit-content',
    flexShrink: 0,
    userSelect: 'none',
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
      variants: { size: 'sm', color: 'gradient' },
      style: { textTransform: 'none' },
    },
  ],
});

export const indicator = recipe({
  base: {
    flexShrink: 0,
  },
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

export const removeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'none',
});
