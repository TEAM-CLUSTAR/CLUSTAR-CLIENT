import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const PRIMARY_COLOR_VAR = '--card-primary-color';

const RADIUS_DEFAULT = '12px';
const RADIUS_AI_MODE = '0 12px 12px 0';

const EASE_STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';

const BAR_TRANSITION = `transform 520ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ${EASE_STANDARD}`;

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

    backgroundColor: themeVars.color.white,

    // 카드: 배경 + radius만 애니메이션
    transition: `background-color 300ms ${EASE_STANDARD}, border-radius 220ms ease-out`,

    outline: '2px solid transparent',
    outlineOffset: '-2px',

    selectors: {
      // 왼쪽 bar
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '0.4rem',
        height: '100%',
        backgroundColor: themeVars.color.grey400,
        pointerEvents: 'none',
        zIndex: 1,

        transform: 'translateY(-50%) scaleY(0)',
        transformOrigin: 'center',
        transition: BAR_TRANSITION,
        transitionDelay: '40ms',
      },

      // - 기본 outline(hover) + NEW 그라데이션 레이어는 ::after 하나로 관리
      // - 기본 상태: boxShadow로 hover outline
      // - NEW 상태: mask 그라데이션으로 전환(※ 여기서만 속성이 바뀜)
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: RADIUS_DEFAULT,
        pointerEvents: 'none',

        boxShadow: `inset 0 0 0 2px ${themeVars.color.grey400}`,
        opacity: 0,

        transition: `opacity 180ms ${EASE_STANDARD}, border-radius 220ms ease-out`,
      },
    },
  },

  variants: {
    imageUrl: {
      true: { height: '42.4rem' },
      false: { height: '20rem' },
    },

    // 기본 카드 hover
    isDefault: {
      true: {
        selectors: {
          '&:hover::after': { opacity: 1 },
        },
      },
      false: {},
    },

    // NEW 결과 (그라데이션 테두리)
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

    // AI 모드
    isAiMode: {
      true: {
        borderRadius: RADIUS_AI_MODE,

        selectors: {
          '&::before': {
            transform: 'translateY(-50%) scaleY(1)',
          },

          '&:hover::before': {
            backgroundColor: `var(${PRIMARY_COLOR_VAR})`,
          },
        },
      },
      false: {},
    },

    // NEW + AI 모드 조합 (Card.tsx에서 이미 boolean으로 만들어서 넘김)
    aiNewResultAndAiMode: {
      true: {
        borderRadius: RADIUS_AI_MODE,
        selectors: {
          '&::after': {
            borderRadius: RADIUS_AI_MODE,
          },
        },
      },
      false: {},
    },

    // 선택 상태 (Card.tsx에서 isAiMode일 때만 true로 넘김)
    isSelectedCard: {
      true: {
        backgroundColor: themeVars.color.blue50,
        selectors: {
          '&::before': {
            backgroundColor: `var(${PRIMARY_COLOR_VAR})`,
          },
        },
      },
      false: {},
    },

    // 클릭 가능 여부
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

export const imageContainer = recipe({
  base: {
    width: '100%',
    height: '22.4rem',
    borderRadius: '12px 12px 0 0',
    overflow: 'hidden',

    // 카드 radius와 싱크
    transition: 'border-top-left-radius 220ms ease-out',
  },
  variants: {
    isAiMode: {
      true: { borderRadius: '0 12px 0 0' },
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
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '2.2rem 2rem',
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
