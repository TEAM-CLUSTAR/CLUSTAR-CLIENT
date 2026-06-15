import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const PRIMARY_COLOR_VAR = '--card-primary-color';

const RADIUS_DEFAULT = '12px';

const EASE_STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const cardContainer = recipe({
  base: {
    vars: {
      [PRIMARY_COLOR_VAR]: themeVars.color.grey400,
    },

    width: '32rem',
    borderRadius: RADIUS_DEFAULT,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.20)',
    cursor: 'default',

    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',

    backgroundColor: themeVars.color.white,

    transition: `background-color 300ms ${EASE_STANDARD}`,

    outline: '2px solid transparent',
    outlineOffset: '-2px',

    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: RADIUS_DEFAULT,
        pointerEvents: 'none',

        boxShadow: `inset 0 0 0 2px ${themeVars.color.grey400}`,
        opacity: 0,

        transition: `opacity 180ms ${EASE_STANDARD}`,
      },
    },
  },

  variants: {
    imageUrl: {
      true: { height: '42.4rem' },
      false: { height: '20rem' },
    },

    isDefault: {
      true: {
        selectors: {
          '&:hover::after': { opacity: 1 },
        },
      },
      false: {},
    },

    aiNewResult: {
      true: {
        backgroundImage: themeVars.color.gradient03,
        selectors: {
          '&::after': {
            opacity: 1,

            boxShadow: 'none',
            padding: '2px',
            background: themeVars.color.gradient02,
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        },
      },
      false: {},
    },

    isSelectedCard: {
      true: {
        backgroundColor: themeVars.color.blue50,
      },
      false: {},
    },

    isClickable: {
      true: {
        cursor: 'pointer',
      },
      false: {
        cursor: 'default',
      },
    },
  },
});

export const imageContainer = style({
  width: '100%',
  height: '22.4rem',
  borderRadius: '12px 12px 0 0',
  overflow: 'hidden',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const allContentsContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2.2rem 2rem',
  minHeight: 0,
});

export const textContent = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  variants: {
    aiResult: {
      true: { marginTop: '1.4rem' },
      false: { marginTop: '2rem' },
    },
    aiNewResult: {
      true: { marginTop: '1.2rem' },
      false: {},
    },
  },
});

export const labelListContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const titleContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    aiResult: {
      true: { gap: '0.4rem' },
      false: {},
    },
  },
});

export const icon = style({
  flexShrink: 0,
});

export const aiNewResult = style({
  ...themeVars.fontStyles.body_m_14,
  flex: '1',
  textAlign: 'end',
  color: themeVars.color.blue400,
});

export const content = style({
  ...themeVars.fontStyles.body_m_14,
  height: '4.2rem',
  color: themeVars.color.grey700,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const footerContenContainer = style({
  ...themeVars.fontStyles.body_m_14,
  display: 'flex',
  justifyContent: 'space-between',
  color: themeVars.color.grey500,
});

export const fileInfoContainer = style({
  display: 'flex',
  gap: '0.4rem',
});

export const fileInfo = style({
  display: 'flex',
  gap: '0.2rem',
  alignItems: 'center',
  color: themeVars.color.grey500,
});
