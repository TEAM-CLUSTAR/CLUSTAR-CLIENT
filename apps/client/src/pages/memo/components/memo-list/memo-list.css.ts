import { style } from '@vanilla-extract/css';

const CARD_MIN_WIDTH = '34rem';
const CARD_MAX_WIDTH = '38rem';
const GAP = '2rem';

export const memoListContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_MIN_WIDTH}, max-content))`,
  justifyContent: 'safe center',
  gap: GAP,
  maxWidth: `calc(${CARD_MAX_WIDTH} * 3 + ${GAP} * 2)`,
  minWidth: `calc(${CARD_MIN_WIDTH} * 2 + ${GAP} )`,
});
