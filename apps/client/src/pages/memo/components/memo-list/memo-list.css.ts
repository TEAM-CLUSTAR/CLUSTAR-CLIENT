import { style } from '@vanilla-extract/css';

const CARD_MIN_WIDTH = '34rem';
const GAP = '2rem';

export const memoListContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_MIN_WIDTH}, max-content))`,
  minWidth: `calc(${CARD_MIN_WIDTH} * 2 + ${GAP})`,
  justifyContent: 'safe center',
  gap: GAP,
});
