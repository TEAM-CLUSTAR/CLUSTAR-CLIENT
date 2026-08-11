import { style } from '@vanilla-extract/css';

const CARD_MIN_WIDTH = '34rem';
const CARD_MAX_WIDTH = '38rem';
const GAP = '2rem';

const THREE_COLUMN_MIN_WIDTH = '1060px';
const MEMO_LIST_CONTAINER = 'memoList';

const columns = (count: number) =>
  `repeat(${count}, minmax(${CARD_MIN_WIDTH}, ${CARD_MAX_WIDTH}))`;

export const memoListContainer = style({
  width: '100%',
  containerType: 'inline-size',
  containerName: MEMO_LIST_CONTAINER,
});

export const memoListGrid = style({
  display: 'grid',
  gridTemplateColumns: columns(2),
  justifyContent: 'safe center',
  gap: GAP,

  '@container': {
    [`${MEMO_LIST_CONTAINER} (min-width: ${THREE_COLUMN_MIN_WIDTH})`]: {
      gridTemplateColumns: columns(3),
    },
  },
});
