import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

import { fadeIn } from 'node_modules/@cds/ui/src/styles/animations.css';

const smoothTransition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';

const fadeInAnimation = `${fadeIn} 0.4s cubic-bezier(0.25, 1, 0.5, 1)`;

export const container = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',

    borderRadius: '16px',
    border: `2px solid ${themeVars.color.white}`,
    boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.1)',
    backgroundColor: themeVars.color.grey50,

    whiteSpace: 'nowrap',
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: {
        width: '26rem',
        padding: '2.4rem 2rem',
        overflow: 'hidden',
      },
      false: {
        width: '6.4rem',
        padding: '2.4rem 1.4rem',
        overflow: 'visible',
      },
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '5.4rem',
});

export const logo = recipe({
  base: {
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: {
        opacity: 1,
      },
      false: {
        width: 0,
        opacity: 0,
      },
    },
  },
});

export const title = recipe({
  base: {
    paddingLeft: '1rem',
  },
  variants: {
    expanded: {
      true: {
        opacity: 1,
        transition: smoothTransition,
      },
      false: {
        opacity: 0,
        paddingLeft: 0,
        width: 0,
      },
    },
  },
});

export const foldingBtn = style({
  position: 'relative',
  marginLeft: 'auto',
  borderRadius: '8px',
  ':hover': { backgroundColor: themeVars.color.grey200 },
});

const textBaseStyle = {
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey600,
  transition: smoothTransition,
};

export const menu = recipe({
  base: {
    ...textBaseStyle,
    paddingBottom: '1.2rem',
  },
  variants: {
    expanded: {
      true: {
        height: 'auto',
        opacity: 1,
      },
      false: {
        opacity: 0,
        paddingBottom: 0,
        height: 0,
      },
    },
  },
});

export const menuList = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: { gap: '0.8rem', animation: fadeInAnimation },
      false: { gap: '1.6rem' },
    },
  },
});

export const iconContainer = style({
  position: 'relative',
});

export const floatingMenu = style({
  visibility: 'hidden',
  position: 'absolute',
  top: '45%',
  left: 'calc(100% + 1.4rem)',
  zIndex: themeVars.zIndex.sidebar,

  marginLeft: '1.2rem',

  transform: 'translateY(-50%)',
  opacity: 0,

  selectors: {
    [`${iconContainer}:hover &, ${foldingBtn}:hover &`]: {
      visibility: 'visible',
      opacity: 1,
    },
  },
});

export const label = recipe({
  base: {
    ...textBaseStyle,
    padding: '5.6rem 0 1.2rem 0',
  },
  variants: {
    expanded: {
      true: {
        height: 'auto',
        opacity: 1,
      },
      false: { height: 0, padding: 0, opacity: 0 },
    },
  },
});

export const labelList = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: { gap: '1.2rem', animation: fadeInAnimation },
      false: { paddingTop: '1.6rem' },
    },
  },
});

export const labelContainer = style({
  position: 'relative',
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '8px',

  ':hover': {
    backgroundColor: themeVars.color.grey200,
  },
});

export const profileWrapper = style({
  animation: fadeInAnimation,
});

export const sidebarBottom = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: { gap: '3rem', animation: fadeInAnimation },
      false: { gap: '0.8rem' },
    },
  },
});

export const floatingLabel = style({
  visibility: 'hidden',
  position: 'absolute',
  top: '50%',
  left: 'calc(100% + 1.4rem)',
  marginLeft: '1.2rem',
  zIndex: themeVars.zIndex.button,

  transform: 'translateY(-17%)',
  opacity: 0,
  transition: 'opacity 0.2s ease',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-4rem',
    width: '4rem',
    backgroundColor: 'transparent',
  },

  selectors: {
    [`${labelContainer}:hover &`]: {
      visibility: 'visible',
      opacity: 1,
    },
  },
});
