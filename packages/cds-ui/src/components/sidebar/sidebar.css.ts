import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    margin: '2rem 0 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100dvh - 4rem)',
    backgroundColor: themeVars.color.grey50,
    borderRadius: '16px',
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

export const logo = style({
  height: '3.6rem',
  width: '3.6rem',
  borderRadius: '4px',
  backgroundColor: themeVars.color.grey200,
});

export const title = style({ paddingLeft: '1rem' });

export const foldingBtn = style({
  borderRadius: '8px',
  marginLeft: 'auto',
  ':hover': { backgroundColor: themeVars.color.grey200 },
});

export const menu = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey600,
  paddingBottom: '1.2rem',
});

export const menuList = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    expanded: {
      true: {
        gap: '0.8rem',
      },
      false: {
        gap: '1.6rem',
      },
    },
  },
});

export const label = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey600,
  padding: '5.6rem 0 1.2rem 0',
});

export const labelList = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    expanded: {
      true: {
        gap: '1.2rem',
      },
      false: {
        paddingTop: '1.6rem',
      },
    },
  },
});

export const sidebarBottom = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    pointerEvents: 'none',
  },
  variants: {
    expanded: {
      true: {
        gap: '3rem',
      },
      false: {
        gap: '0.8rem',
      },
    },
  },
});
