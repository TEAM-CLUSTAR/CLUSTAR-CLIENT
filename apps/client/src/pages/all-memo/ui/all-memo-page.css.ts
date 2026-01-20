import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const homePageContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  variants: {
    isPromptOpen: {
      true: {
        width: 'calc(100% - 60rem)',
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
    width: '100%',
  },
  variants: {
    isPromptOpen: {
      true: {
        alignItems: 'center',
      },
      false: {},
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
