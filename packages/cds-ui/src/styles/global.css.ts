import { globalStyle } from '@vanilla-extract/css';

import { themeVars } from './theme.css';

globalStyle('html, body', {
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  fontSize: '62.5%',
  fontFamily: `'Pretendard Variable', sans-serif`,
  scrollbarWidth: 'thin',
  scrollbarColor: `${themeVars.color.grey300} transparent`,
});

globalStyle('::-webkit-scrollbar', {
  width: '16px',
  height: '16px',
});

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: 'transparent',
});

globalStyle('::-webkit-scrollbar-thumb', {
  backgroundColor: themeVars.color.grey300,
  backgroundClip: 'content-box',
  border: '8px solid transparent',
  borderRadius: '100px',
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  backgroundColor: themeVars.color.grey400,
});

globalStyle('*', {
  boxSizing: 'border-box',
});
