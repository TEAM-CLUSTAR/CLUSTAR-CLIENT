import { themeVars } from '../styles';

export type TagTextType = 'AI 결과물' | '태그 없음';

export type TagColorType =
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'aiBlue'
  | 'grey';

export const TAG_COLOR_BY_TEXT: Record<TagTextType, TagColorType> = {
  'AI 결과물': 'aiBlue',
  '태그 없음': 'grey',
};

export const PRIMARY_COLOR_VALUE_BY_TAG_COLOR: Record<TagColorType, string> = {
  blue: themeVars.color.sub04,
  purple: themeVars.color.sub02,
  green: themeVars.color.sub06,
  pink: themeVars.color.sub08,
  aiBlue: themeVars.color.blue50,
  grey: themeVars.color.grey200,
};
