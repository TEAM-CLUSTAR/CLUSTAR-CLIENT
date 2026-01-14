import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const smoothTransition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeInAnimation = `${fadeIn} 0.4s cubic-bezier(0.25, 1, 0.5, 1)`;

export const container = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    backgroundColor: themeVars.color.grey50,
    borderRadius: '16px',
    transition: smoothTransition,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  variants: {
    expanded: {
      true: {
        width: '26rem',
        padding: '2.4rem 2rem',
      },
      false: {
        width: '6.4rem',
        padding: '2.4rem 1.4rem',
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
    height: '3.6rem',
    borderRadius: '4px',
    backgroundColor: themeVars.color.grey200,
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: {
        width: '3.6rem',
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
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: {
        opacity: 1,
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
  borderRadius: '8px',
  marginLeft: 'auto',
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
        opacity: 1,
        height: 'auto',
      },
      false: {
        opacity: 0,
        height: 0,
        paddingBottom: 0,
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
  position: 'absolute',
  left: 'calc(100% + 1.4rem)',
  top: '50%',
  transform: 'translateY(-50%)',
  marginLeft: '1.2rem',
  opacity: 0,
  visibility: 'hidden',

  selectors: {
    [`${iconContainer}:hover &, ${foldingBtn}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
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
        opacity: 1,
        height: 'auto',
      },
      false: {
        opacity: 0,
        height: 0,
        padding: 0,
      },
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
  position: 'absolute',
  left: 'calc(100% + 1.4rem)',
  top: '50%',
  transform: 'translateY(-17%)',
  marginLeft: '1.2rem',

  opacity: 0,
  transition: 'opacity 0.2s ease',
  visibility: 'hidden',
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
      opacity: 1,
      visibility: 'visible',
    },
  },
});
