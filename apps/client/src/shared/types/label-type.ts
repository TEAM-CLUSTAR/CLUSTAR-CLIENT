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
