import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const gridContainer = recipe({
  base: {
    display: 'grid',
    gap: '2.4rem',
    padding: '0 0 1.2rem 0',
  },
  variants: {
    hasAiComponent: {
      true: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '0 2.2rem 0 4.6rem',
        width: '73.2rem',
      },
      false: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '0 7.6rem 0 7.6rem',
        width: '116rem',
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
    scrollbarGutter: 'stable',
    display: 'flex',
    justifyContent: 'center',
  },

  variants: {
    hasAiComponent: {
      true: { width: 'calc(min-content - 12px)' },
      false: { width: 'auto' },
    },
  },
});
