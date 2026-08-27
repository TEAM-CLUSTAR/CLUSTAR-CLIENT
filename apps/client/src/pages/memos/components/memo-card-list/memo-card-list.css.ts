import { style } from '@vanilla-extract/css';

const MEMO_LIST_CONTAINER = 'memoList';
const LIST_MIN_WIDTH = '800px';

const columns = (count: number) => `repeat(${count}, minmax(34rem, 1fr))`;

export const memoListContainer = style({
  width: '100%',
  containerType: 'inline-size',
  containerName: MEMO_LIST_CONTAINER,
});

export const memoListGrid = style({
  display: 'grid',
  gridTemplateColumns: columns(2),
  justifyContent: 'safe center',
  gap: '2rem',
  width: '100%',
  minWidth: LIST_MIN_WIDTH,
  maxWidth: LIST_MIN_WIDTH,
  marginInline: 'auto',

  '@container': {
    [`${MEMO_LIST_CONTAINER} (min-width: 1060px)`]: {
      gridTemplateColumns: columns(3),
      maxWidth: '1180px',
    },
  },
});
