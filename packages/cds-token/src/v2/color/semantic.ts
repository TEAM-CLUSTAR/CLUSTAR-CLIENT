import { primitiveColor } from './primitive';

export const color = {
  bg: {
    canvas: primitiveColor.brand_neutral_0,
    subtle: primitiveColor.brand_neutral_5,
    muted: primitiveColor.brand_neutral_10,
    elevated: primitiveColor.brand_neutral_0,
    inverse: primitiveColor.brand_neutral_80,
    hover: primitiveColor.neutral_alpha_dark_4,
    pressed: primitiveColor.neutral_alpha_dark_8,
    selected: primitiveColor.neutral_alpha_dark_8,
    overlay: primitiveColor.neutral_alpha_dark_40,
    brand: primitiveColor.brand_blue_50,
    brand_hover: primitiveColor.brand_blue_60,
    brand_subtle: primitiveColor.brand_blue_10,
    danger: primitiveColor.various_red_60,
    danger_subtle: primitiveColor.various_red_10,
    warning_subtle: primitiveColor.various_orange_10,
    highlight: primitiveColor.brand_blue_20,
    highlight_active: primitiveColor.brand_blue_30,
    text_selection: primitiveColor.blue_alpha_20,
  },

  text: {
    primary: primitiveColor.brand_neutral_90,
    secondary: primitiveColor.brand_neutral_70,
    tertiary: primitiveColor.brand_neutral_60,
    disabled: primitiveColor.brand_neutral_40,
    inverse: primitiveColor.brand_neutral_0,
    on_brand: primitiveColor.brand_neutral_0,
    brand: primitiveColor.brand_blue_50,
    danger: primitiveColor.various_red_70,
    warning: primitiveColor.various_orange_70,
  },

  border: {
    subtle: primitiveColor.brand_neutral_10,
    default: primitiveColor.brand_neutral_20,
    strong: primitiveColor.brand_neutral_30,
    focus: primitiveColor.brand_blue_40,
    brand: primitiveColor.brand_blue_50,
    danger: primitiveColor.various_red_50,
    warning: primitiveColor.various_orange_40,
  },

  icon: {
    primary: primitiveColor.brand_neutral_80,
    secondary: primitiveColor.brand_neutral_60,
    disabled: primitiveColor.brand_neutral_40,
    inverse: primitiveColor.brand_neutral_0,
    brand: primitiveColor.brand_blue_50,
    danger: primitiveColor.various_red_60,
    warning: primitiveColor.various_orange_50,
  },

  shadow: {
    color: primitiveColor.neutral_alpha_dark_12,
  },

  tag: {
    // tag/rose
    rose_bg: primitiveColor.various_rose_10,
    rose_text: primitiveColor.various_rose_70,
    rose_dot: primitiveColor.various_rose_50,

    // tag/orange
    orange_bg: primitiveColor.various_orange_10,
    orange_text: primitiveColor.various_orange_70,
    orange_dot: primitiveColor.various_orange_50,

    // tag/amber
    amber_bg: primitiveColor.various_amber_10,
    amber_text: primitiveColor.various_amber_70,
    amber_dot: primitiveColor.various_amber_50,

    // tag/lime
    lime_bg: primitiveColor.various_lime_10,
    lime_text: primitiveColor.various_lime_70,
    lime_dot: primitiveColor.various_lime_50,

    // tag/green
    green_bg: primitiveColor.various_green_10,
    green_text: primitiveColor.various_green_70,
    green_dot: primitiveColor.various_green_50,

    // tag/teal
    teal_bg: primitiveColor.various_teal_10,
    teal_text: primitiveColor.various_teal_70,
    teal_dot: primitiveColor.various_teal_50,

    // tag/cyan
    cyan_bg: primitiveColor.various_cyan_10,
    cyan_text: primitiveColor.various_cyan_70,
    cyan_dot: primitiveColor.various_cyan_50,

    // tag/sky
    sky_bg: primitiveColor.various_sky_10,
    sky_text: primitiveColor.various_sky_70,
    sky_dot: primitiveColor.various_sky_50,

    // tag/violet
    violet_bg: primitiveColor.various_violet_10,
    violet_text: primitiveColor.various_violet_70,
    violet_dot: primitiveColor.various_violet_50,

    // tag/magenta
    magenta_bg: primitiveColor.various_magenta_10,
    magenta_text: primitiveColor.various_magenta_70,
    magenta_dot: primitiveColor.various_magenta_50,

    // tag/default
    default_bg: primitiveColor.brand_neutral_10,
    default_text: primitiveColor.brand_neutral_70,
    default_dot: primitiveColor.brand_neutral_50,
  },
} as const;
