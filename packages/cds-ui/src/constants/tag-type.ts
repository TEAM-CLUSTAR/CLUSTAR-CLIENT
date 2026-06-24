import { themeVars } from '../styles';

export type TagTextType = 'AI 결과물' | '태그 없음';

export type TagColorType =
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'lightBlue'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'gradient'
  | 'grey';

export const TAG_COLOR_BY_TEXT: Record<TagTextType, TagColorType> = {
  'AI 결과물': 'gradient',
  '태그 없음': 'grey',
};

export const PRIMARY_COLOR_VALUE_BY_TAG_COLOR: Record<TagColorType, string> = {
  pink: themeVars.color.sub_pink_100,
  red: themeVars.color.sub_red_100,
  orange: themeVars.color.sub_orange_100,
  yellow: themeVars.color.sub_yellow_100,
  green: themeVars.color.sub_green_100,
  cyan: themeVars.color.sub_cyan_100,
  lightBlue: themeVars.color.sub_lightBlue_100,
  blue: themeVars.color.sub_blue_100,
  purple: themeVars.color.sub_purple_100,
  magenta: themeVars.color.sub_magenta_100,
  gradient: themeVars.color.blue50,
  grey: themeVars.color.grey200,
};
