import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    width: '18.8rem',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // border 대신 inset box-shadow로 그려서 레이아웃 높이에 영향을 주지 않게 함
    boxShadow: 'inset 0 -2.5px 0 0 transparent',
  },

  variants: {
    isSelected: {
      true: {
        boxShadow: `inset 0 -2.5px 0 0 ${themeVars.color.blue400}`,
        color: themeVars.color.blue500,
      },
    },
    isHoverActive: {
      true: {
        transition: 'box-shadow 0.1s ease',
        boxShadow: `inset 0 -2.5px 0 0 ${themeVars.color.grey500}`,
        color: themeVars.color.grey600,
      },
    },
  },
});

export const icon = style({
  flexShrink: 0,
});

export const selectTab = style({
  display: 'flex',
  gap: '0.3rem',
  alignItems: 'center',
  minWidth: 0,
  flex: 1,
  border: 'none',
  backgroundColor: 'transparent',
  padding: '2rem 0.8rem',
  // closeTab 영역 3.2rem + 탭-닫기 버튼 간격 1rem
  paddingRight: '4.2rem',
});

export const closeTab = recipe({
  base: {
    position: 'absolute',
    top: '50%',
    right: '0.8rem',
    transform: 'translateY(-50%)',
    borderRadius: '0.8rem',
    padding: '0.4rem',
    backgroundColor: 'transparent',
    selectors: {
      [`${container.classNames.base}:focus-within &`]: {
        opacity: 1,
        pointerEvents: 'auto',
      },
      '&:hover': {
        transition: 'background-color 0.2s ease',
        backgroundColor: themeVars.color.grey100,
      },
    },
  },

  variants: {
    isHovered: {
      true: { opacity: 1, pointerEvents: 'auto' },
      false: { opacity: 0, pointerEvents: 'none' },
    },
  },
});

export const memoTitle = recipe({
  base: {
    color: themeVars.color.grey500,
    ...themeVars.fontStyles.body_m_16,
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  variants: {
    isSelected: {
      true: {
        color: themeVars.color.blue500,
      },
    },
    isHoverActive: {
      true: {
        color: themeVars.color.grey600,
      },
    },
  },
});
