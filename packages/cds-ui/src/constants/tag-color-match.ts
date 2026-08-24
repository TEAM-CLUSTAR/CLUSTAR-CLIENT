import { themeVars } from '../styles';

export type TagColorType =
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'light-blue'
  | 'blue'
  | 'purple'
  | 'magenta';

export const TAG_COLOR_MATCH: Record<
  TagColorType,
  { backgroundColor: string; textColor: string }
> = {
  pink: {
    backgroundColor: themeVars.color.sub_pink_100,
    textColor: themeVars.color.sub_pink_500,
  },
  red: {
    backgroundColor: themeVars.color.sub_red_100,
    textColor: themeVars.color.sub_red_500,
  },
  orange: {
    backgroundColor: themeVars.color.sub_orange_100,
    textColor: themeVars.color.sub_orange_500,
  },
  yellow: {
    backgroundColor: themeVars.color.sub_yellow_100,
    textColor: themeVars.color.sub_yellow_500,
  },
  green: {
    backgroundColor: themeVars.color.sub_green_100,
    textColor: themeVars.color.sub_green_500,
  },
  cyan: {
    backgroundColor: themeVars.color.sub_cyan_100,
    textColor: themeVars.color.sub_cyan_500,
  },
  'light-blue': {
    backgroundColor: themeVars.color.sub_lightBlue_100,
    textColor: themeVars.color.sub_lightBlue_500,
  },
  blue: {
    backgroundColor: themeVars.color.sub_blue_100,
    textColor: themeVars.color.sub_blue_500,
  },
  purple: {
    backgroundColor: themeVars.color.sub_purple_100,
    textColor: themeVars.color.sub_purple_500,
  },
  magenta: {
    backgroundColor: themeVars.color.sub_magenta_100,
    textColor: themeVars.color.sub_magenta_500,
  },
};

/** 태그가 없는 트리뷰 버전 색상 */
export const NO_TAG_COLOR = {
  backgroundColor: themeVars.color.grey300,
  textColor: themeVars.color.grey600,
};
