import { createTheme } from '@vanilla-extract/css';

import { tokens } from '../token';

export const [themeClass, themeVars] = createTheme(tokens);
