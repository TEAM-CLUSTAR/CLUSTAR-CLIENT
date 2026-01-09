import { fontStyles } from '../token/font-style';
import { typography } from '../token/typography';
import { width } from '../token/width';

import { color } from '../token/color.css';

export const tokens = {
  color: color,
  fontStyles: fontStyles,
  width: width,
  ...typography,
} as const;
