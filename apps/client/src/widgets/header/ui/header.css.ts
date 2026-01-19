import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    gap: '5.6rem',
    width: '100.8rem',
    justifyContent: 'space-between',
  },
  variants: {
    isAiMode: {
      true: {
        width: '66.4rem',
        padding: '3.2rem 0 1.6rem 0',
      },
      false: {
        width: '100.8rem',
        padding: '3.2rem 0 1.6rem 0',
      },
    },
  },
});
