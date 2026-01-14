import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const PRIMARY_COLOR_VAR = '--card-primary-color';

export const cardContainer = recipe({
  base: {
    vars: {
      [PRIMARY_COLOR_VAR]: themeVars.color.grey400,
    },

    width: '32rem',
    borderRadius: '12px',
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.20)',
    cursor: 'pointer',

    position: 'relative',
    overflow: 'hidden',

    backgroundColor: themeVars.color.white,
    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',

    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '4px',
        height: '100%',
        backgroundColor: themeVars.color.grey400,
        pointerEvents: 'none',
        zIndex: 1,

        transform: 'translateY(-50%) scaleY(0)',
        transformOrigin: 'center',
        transition:
          'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: '40ms',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '12px',
        pointerEvents: 'none',
        boxShadow: `inset 0 0 0 2px ${themeVars.color.grey400}`,
        opacity: 0,
        transition: 'opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)',

        transitionProperty: 'opacity, border-radius',
        transitionDuration: '180ms, 220ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1), ease-out',
        transitionDelay: '0ms, 180ms', // 카드 radius랑 맞추기
      },
    },
  },
  variants: {
    imageUrl: {
      true: {
        height: '42.4rem',
      },
      false: {
        height: '20rem',
      },
    },
    isDefault: {
      true: {
        selectors: {
          '&:hover::after': {
            opacity: 1,
          },
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
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            padding: '2px',
            background: themeVars.color.gradient02,
            pointerEvents: 'none',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            boxShadow: 'none', // ← default hover shadow 제거
          },
        },
      },
      false: {},
    },
    isAiMode: {
      true: {
        borderRadius: '0 12px 12px 0',
        transitionProperty:
          'background-color, border-top-left-radius, border-bottom-left-radius',
        transitionDuration: '200ms, 220ms, 220ms',
        transitionTimingFunction:
          'cubic-bezier(0.4, 0, 0.2, 1), ease-out, ease-out',
        transitionDelay: '0ms, 180ms, 180ms',

        selectors: {
          '&::before': {
            transform: 'translateY(-50%) scaleY(1)',
          },

          '&:hover::before': {
            backgroundColor: `var(${PRIMARY_COLOR_VAR})`,
          },
        },
      },

      false: {
        selectors: {
          '&::after': {
            borderRadius: '12px',
            transition: 'opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
    aiNewResultAndAiMode: {
      true: {
        borderRadius: '0 12px 12px 0',
        selectors: {
          '&::after': {
            borderRadius: '0 12px 12px 0',
          },
        },
      },
      false: {},
    },
    isSelectedCard: {
      true: {
        backgroundColor: themeVars.color.blue50,
        transition: 'background-color 350ms ease',
        selectors: {
          '&::before': {
            backgroundColor: `var(${PRIMARY_COLOR_VAR})`,
          },
        },
      },
      false: {},
    },
  },
});

export const imageContainer = recipe({
  base: {
    width: '100%',
    height: '22.4rem',
    borderRadius: '12px 12px 0 0',
    overflow: 'hidden',
  },
  variants: {
    isAiMode: {
      true: {
        borderRadius: '0 12px 0 0',
      },
      false: {},
    },
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const allContentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.1em',
  padding: '2.2rem 2rem',
});

export const textContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '2rem',
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

export const aiNewResult = style({
  ...themeVars.fontStyles.body_m_14,
  flex: '1',
  textAlign: 'end',
  color: themeVars.color.blue400,
});

export const content = style({
  ...themeVars.fontStyles.body_m_14,
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
