import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const gridContainer = recipe({
  base: {
    display: 'grid',
    gap: '2.4rem',
    marginBottom: '2rem',
    marginLeft: '2rem',
    padding: '0 2rem',
  },
  variants: {
    hasAiComponent: {
      true: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        '@media': {
          '(max-width: 1770px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        },
      },
      false: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        '@media': {
          '(max-width: 1770px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        },
      },
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

export const scrollContainer = recipe({
  base: {
    height: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    // backgroundColor: 'red',
  },

  variants: {
    hasAiComponent: {
      true: { width: 'calc(min-content - 12px)' },
      false: { width: 'auto' },
    },
  },
});
