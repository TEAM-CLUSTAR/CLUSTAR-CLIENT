import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '12px',
  padding: '1.6rem 1.8rem',
  border: `1.5px solid ${themeVars.color.grey300}`,
  transition: 'border-color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
  selectors: {
    '&:focus-within': {
      borderColor: themeVars.color.blue500,
    },
  },
});

export const memoList = style({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '0.8rem',
  width: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const textarea = style({
  width: '100%',
  minHeight: '6.6rem',
  maxHeight: '19.2rem',
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  backgroundColor: 'transparent',
  selectors: {
    '&::placeholder': {
      color: themeVars.color.grey500,
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// 버튼 리디자인 이전 공통 Button sm 스타일을 그대로 옮긴 임시 전송 버튼
export const sendButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.blue500,
  transition: 'background-color 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: themeVars.color.blue700,
    },
    '&:disabled': {
      backgroundColor: themeVars.color.grey400,
      cursor: 'not-allowed',
    },
  },
});
