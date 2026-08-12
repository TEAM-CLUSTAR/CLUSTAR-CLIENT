import { style } from '@vanilla-extract/css';

const THREE_COLUMN_MIN_WIDTH = '1060px';
const MEMO_LIST_CONTAINER = 'memoList';

const columns = (count: number) => `repeat(${count}, minmax(34rem, 38rem)`;

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

  '@container': {
    [`${MEMO_LIST_CONTAINER} (min-width: ${THREE_COLUMN_MIN_WIDTH})`]: {
      gridTemplateColumns: columns(3),
    },
  },
});
