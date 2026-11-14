import { createTheme } from '@vanilla-extract/css';

import { color, fontStyles, zIndex } from '@cds/token';

// @TODO createTheme 제거 후 의존성 삭제
export const [themeClass, themeVars] = createTheme({
  color,
  fontStyles,
  zIndex,
});
