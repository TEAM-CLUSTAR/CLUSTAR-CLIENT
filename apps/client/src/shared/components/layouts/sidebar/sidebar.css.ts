import { style } from '@vanilla-extract/css';

import { zIndex } from '@cds/token';
import { themeVars } from '@cds/ui';

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.color.grey50,
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

const collapsedSidebar = `${sidebar}[data-expanded="false"]`;
const expandedSidebar = `${sidebar}[data-expanded="true"]`;

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

export const logoSymbol = style({
  selectors: {
    [`${collapsedSidebar} &`]: {
      width: '4rem',
      height: '4rem',
    },
  },
});

export const logoType = style({
  transition: 'opacity 0.2s ease',
  selectors: {
    [`${collapsedSidebar} &`]: {
      display: 'none',
    },
  },
});

export const foldButton = style({
  selectors: {
    [`${collapsedSidebar} &`]: {
      display: 'none',
    },
  },
});

/* ── sections ── */
export const menuSection = style({
  selectors: {
    [`${expandedSidebar} &`]: { marginTop: '4rem' },
    [`${collapsedSidebar} &`]: { marginTop: '5.7rem' },
  },
});

export const tagSection = style({
  selectors: {
    [`${expandedSidebar} &`]: { marginTop: '2.4rem' },
  },
});

export const sectionTitle = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
  selectors: {
    [`${collapsedSidebar} &`]: {
      display: 'none',
    },
  },
});

export const collapsedDivider = style({
  color: themeVars.color.grey300,
  height: '0.1rem',
  width: '4rem',
  margin: '2.6rem 0',
  display: 'none',
  selectors: {
    [`${collapsedSidebar} &`]: {
      display: 'block',
    },
  },
});

export const pannelList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  selectors: {
    [`${expandedSidebar} &`]: {
      marginTop: '0.4rem',
    },
  },
});

export const pannelItem = style({
  position: 'relative',
  width: '100%',
});

export const tooltip = style({
  display: 'none',
  position: 'absolute',
  top: '45%',
  left: 'calc(100% + 1.4rem)',
  marginLeft: '1.2rem',

  transform: 'translateY(-50%)',
  zIndex: zIndex.sidebar,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',

  selectors: {
    [`${collapsedSidebar} ${pannelItem}:hover &`]: {
      display: 'block',
    },
  },
});

export const mypageSection = style({
  marginTop: 'auto',
});
