import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const homePageContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'hidden',
  },
  variants: {
    isPromptOpen: {
      true: {
        width: 'calc(100% - 58rem)',
      },
      false: {},
    },
  },
  defaultVariants: {
    isPromptOpen: false,
  },
});

export const contentWrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    isPromptOpen: {
      true: {
        padding: '0',
      },
      false: {
        padding: '0 7.6rem',
      },
    },
  },
  defaultVariants: {
    isPromptOpen: false,
  },
});

export const floatingButtonContainer = style({
  position: 'fixed',
  bottom: '5.3rem',
  right: '4.4rem',
});

export const aiPromptContainer = style({
  position: 'fixed',
  top: '2rem',
  right: '2rem',
  bottom: '2rem',
  overflowY: 'auto',
});
