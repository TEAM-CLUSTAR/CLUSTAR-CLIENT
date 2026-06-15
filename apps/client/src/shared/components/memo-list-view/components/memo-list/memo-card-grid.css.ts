import { style } from '@vanilla-extract/css';

export const gridContainer = style({
  display: 'grid',
  gap: '2.4rem',
  marginBottom: '2rem',
  marginLeft: '2rem',
  padding: '0 2rem',
  gridTemplateColumns: 'repeat(4, 1fr)',
  '@media': {
    '(max-width: 1770px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const gridItem = style({
  width: '100%',
});

export const gridItemWithImage = style([
  gridItem,
  {
    gridRow: 'span 2',
  },
]);

export const scrollContainer = style({
  height: '100vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  width: 'auto',
});
