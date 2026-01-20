import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const header = style({
  display: 'inline-flex',
  justifyContent: 'center',
  width: '100%',
});

export const container = recipe({
  base: {
    display: 'flex',
    gap: '5.6rem',
    justifyContent: 'space-between',
  },

  variants: {
    isAiMode: {
      true: {},
      false: {},
    },

    isTree: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { isAiMode: false, isTree: false },
      style: {
        padding: '3.2rem 3rem 6rem 0',
      },
    },
    {
      variants: { isAiMode: true, isTree: false },
      style: {
        padding: '3.2rem 0 6rem 0',
      },
    },
    {
      variants: { isTree: true },
      style: {
        padding: '3.2rem 3rem 1.6rem 0',
      },
    },
  ],
});
