import { fontStyles } from '../token/font-style';
import { typography } from '../token/typography';
import { width } from '../token/width';
import { zIndex } from '../token/z-index';

import { color } from '../token/color.css';

export const tokens = {
  color: color,
  fontStyles: fontStyles,
  width: width,
  zIndex: zIndex,
  ...typography,
} as const;
