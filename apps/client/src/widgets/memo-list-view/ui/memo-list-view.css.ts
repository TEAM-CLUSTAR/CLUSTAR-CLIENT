import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    whiteSpace: 'nowrap',
    width: '100%',
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
    alignContent: 'center',
  },
  variants: {
    isPromptOpen: {
      true: {
        padding: '0',

        alignItems: 'center',
      },
      false: {
        padding: '0',
      },
    },
    isCard: {
      true: {},
      false: { width: '100%' },
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
