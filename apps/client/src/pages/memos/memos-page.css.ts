import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

const HEADER_CONTAINER = 'header';
const HEADER_MAX_WIDTH = '1180px';
const HEADER_MIN_WIDTH = '800px';

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  containerType: 'inline-size',
  containerName: HEADER_CONTAINER,
  overflow: 'hidden',
  scrollbarGutter: 'stable',
});

export const headerSection = style({
  width: '100%',
  paddingInline: '4rem',
  flexShrink: 0,
});

export const headerContainer = style({
  width: '100%',
  minWidth: HEADER_MIN_WIDTH,
  maxWidth: HEADER_MIN_WIDTH,
  marginInline: 'auto',
  position: 'sticky',
  top: 0,
  backgroundColor: themeVars.color.grey50,

  '@container': {
    [`${HEADER_CONTAINER} (min-width: 1060px)`]: {
      maxWidth: HEADER_MAX_WIDTH,
    },
  },
});

export const scrollArea = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  scrollbarGutter: 'stable',
});
