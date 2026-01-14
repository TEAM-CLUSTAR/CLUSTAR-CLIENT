import { themeVars } from '@cds/ui';

export type LabelTextType =
  | '졸업 프로젝트'
  | '교양'
  | 'SOPT'
  | '레퍼런스'
  | '태그없음';

export type LabelColorType = 'blue' | 'green' | 'pink' | 'purple' | 'gray';

export const LABEL_COLOR_BY_TEXT: Record<LabelTextType, LabelColorType> = {
  '졸업 프로젝트': 'blue',
  교양: 'green',
  SOPT: 'pink',
  레퍼런스: 'purple',
  태그없음: 'gray',
};

export const PRIMARY_COLOR_VALUE_BY_LABEL_COLOR: Record<
  LabelColorType,
  string
> = {
  blue: themeVars.color.blue400,
  green: themeVars.color.label05,
  pink: themeVars.color.label07,
  purple: themeVars.color.label01,
  gray: themeVars.color.grey400,
};
