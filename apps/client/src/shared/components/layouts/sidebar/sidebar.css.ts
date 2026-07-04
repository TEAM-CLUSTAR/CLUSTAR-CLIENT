import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.color.grey50,
  // border 대신 inset box-shadow로 오른쪽 구분선을 그려 콘텐츠 폭이 1px 줄지 않게 함
  // (border-right는 border-box에서 콘텐츠 폭을 40→39px로 만들어 아이콘 정렬이 반픽셀로 깨짐)
  boxShadow: `inset -1px 0 0 ${themeVars.color.grey200}`,
  padding: '2rem',
  height: '100vh',
  flexShrink: '0',
  transition: 'width 0.2s ease',
  selectors: {
    '&[data-expanded="true"]': { width: '26rem' },
    '&[data-expanded="false"]': { width: '8rem' },
  },
});

/* ── header ── */
export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const logoButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

// 접힘: 심볼 40px / 펼침: 타입 로고 옆에 맞춰 32px
export const logoSymbol = style({
  selectors: {
    [`${sidebar}[data-expanded="false"] &`]: {
      width: '4rem',
      height: '4rem',
    },
  },
});

export const logoType = style({
  transition: 'opacity 0.2s ease',
  selectors: {
    [`${sidebar}[data-expanded="false"] &`]: {
      display: 'none',
    },
  },
});

export const foldButton = style({
  selectors: {
    [`${sidebar}[data-expanded="false"] &`]: {
      display: 'none',
    },
  },
});

/* ── sections ── */
export const menuSection = style({
  selectors: {
    [`${sidebar}[data-expanded="true"] &`]: { marginTop: '4rem' },
    [`${sidebar}[data-expanded="false"] &`]: { marginTop: '5.7rem' },
  },
});

export const tagSection = style({
  selectors: {
    // 접힘 상태에서는 divider의 margin이 간격을 담당
    [`${sidebar}[data-expanded="true"] &`]: { marginTop: '2.4rem' },
  },
});

// 펼침에서만 보이는 섹션 제목
export const sectionTitle = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
  selectors: {
    [`${sidebar}[data-expanded="false"] &`]: {
      display: 'none',
    },
  },
});

// 접힘에서만 보이는 구분선(제목 자리를 대체)
export const collapsedDivider = style({
  color: themeVars.color.grey300,
  height: '0.1rem',
  width: '4rem',
  margin: '2.6rem 0',
  display: 'none',
  selectors: {
    [`${sidebar}[data-expanded="false"] &`]: {
      display: 'block',
    },
  },
});

export const pannelList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  selectors: {
    [`${sidebar}[data-expanded="true"] &`]: {
      marginTop: '0.4rem',
    },
  },
});

// 각 항목(li)이 사이드바 폭을 꽉 채우도록 (버튼의 width:100% 기준이 됨)
export const pannelItem = style({
  width: '100%',
});

// 마이페이지: nav(flex column)의 남는 세로 공간을 마진으로 밀어 맨 아래로 배치
export const mypageSection = style({
  marginTop: 'auto',
});
