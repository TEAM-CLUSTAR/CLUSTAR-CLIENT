import { style } from '@vanilla-extract/css';

const HEADER_CONTAINER = 'header';
const HEADER_MAX_WIDTH = '1180px';
const HEADER_MIN_WIDTH = '800px';

export const container = style({
  width: '100%',
  paddingInline: '4rem',
  containerType: 'inline-size',
  containerName: HEADER_CONTAINER,
});

export const headerContainer = style({
  width: '100%',
  minWidth: HEADER_MIN_WIDTH,
  maxWidth: HEADER_MIN_WIDTH,
  marginInline: 'auto',

  '@container': {
    [`${HEADER_CONTAINER} (min-width: 1060px)`]: {
      maxWidth: HEADER_MAX_WIDTH,
    },
  },
});
