import { themeVars } from '../styles';

export type LabelTextType =
  | '졸업 프로젝트'
  | '교양'
  | 'SOPT'
  | '레퍼런스'
  | '라벨없음';

export type LabelColorType = 'blue' | 'green' | 'pink' | 'purple' | 'grey';

export const LABEL_COLOR_BY_TEXT: Record<LabelTextType, LabelColorType> = {
  '졸업 프로젝트': 'blue',
  교양: 'green',
  SOPT: 'pink',
  레퍼런스: 'purple',
  라벨없음: 'grey',
};

export const PRIMARY_COLOR_VALUE_BY_LABEL_COLOR: Record<
  LabelColorType,
  string
> = {
  blue: themeVars.color.label03,
  green: themeVars.color.label05,
  pink: themeVars.color.label07,
  purple: themeVars.color.label01,
  grey: themeVars.color.grey400,
};
