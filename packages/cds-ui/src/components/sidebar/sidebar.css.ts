import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const smoothTransition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';

export const container = recipe({
  base: {
    margin: '2rem 0 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100dvh - 4rem)',
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
  minHeight: '3.6rem',
});

export const logo = recipe({
  base: {
    height: '3.6rem',
    borderRadius: '4px',
    backgroundColor: themeVars.color.grey200,
    transition: smoothTransition,
    flexShrink: 0,
  },
  variants: {
    expanded: {
      true: {
        width: '3.6rem',
        opacity: 1,
        transform: 'scale(1)',
        marginRight: '0',
      },
      false: {
        width: 0,
        opacity: 0,
        transform: 'scale(0)',
        marginRight: '-10px',
      },
    },
  },
});

export const title = recipe({
  base: {
    paddingLeft: '1rem',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    transition: smoothTransition,
  },
  variants: {
    expanded: {
      true: {
        opacity: 1,
        transform: 'translateX(0)',
        transitionDelay: '0.1s',
      },
      false: {
        opacity: 0,
        transform: 'translateX(-10px)',
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
  flexShrink: 0,
  ':hover': { backgroundColor: themeVars.color.grey200 },
});

const textBaseStyle = {
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey600,
  transition: smoothTransition,
  overflow: 'hidden',
  whiteSpace: 'nowrap' as const,
  display: 'block',
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
        transform: 'translateY(0)',
      },
      false: {
        opacity: 0,
        height: 0,
        paddingBottom: 0,
        transform: 'translateY(-5px)',
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
      true: { gap: '0.8rem' },
      false: { gap: '1.6rem' },
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
        transform: 'translateY(0)',
      },
      false: {
        opacity: 0,
        height: 0,
        padding: 0,
        transform: 'translateY(-5px)',
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
      true: { gap: '1.2rem' },
      false: { gap: 0 },
    },
  },
});

export const expandedLabelGroup = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
  },
  variants: {
    visible: {
      true: {
        maxHeight: '50rem',
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        maxHeight: 0,
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
});

export const collapsedLabelGroup = recipe({
  base: {
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  variants: {
    visible: {
      true: {
        maxHeight: '10rem',
        opacity: 1,
        marginTop: '1.6rem',
      },
      false: {
        maxHeight: 0,
        opacity: 0,
        marginTop: 0,
      },
    },
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
      true: { gap: '3rem' },
      false: { gap: '0.8rem' },
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
  transition: 'opacity 0.2s ease',
  zIndex: 10,
  pointerEvents: 'none',
  selectors: {
    [`${iconContainer}:hover &, ${foldingBtn}:hover &`]: {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
});
