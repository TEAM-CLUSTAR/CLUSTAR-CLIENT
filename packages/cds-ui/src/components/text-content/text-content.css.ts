import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    width: themeVars.width.full,
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    type: {
      detail: {
        gap: '2.8rem',
      },
      prompt: {
        gap: '2rem',
      },
    },
  },
});

export const headerContainer = style({
  gap: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0, // flex 아이템이 축소될 수 있도록
});

export const titleWrapper = style({
  flex: 1,
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0, // flex 아이템이 축소될 수 있도록
  },
  variants: {
    isAiResult: {
      true: { gap: '0.4rem' },
      false: {},
    },
  },
});

export const titleTextWrapper = style({
  flex: 1,
  minWidth: 0, // 제목이 넘칠 때 ellipsis가 작동하도록
  overflow: 'hidden',
});

export const icon = style({
  backgroundColor: themeVars.color.blue50,
  borderRadius: '8px',
});

export const aiSummary = style({
  ...themeVars.fontStyles.label_sb_12,
  padding: '0 0.2rem',
  color: themeVars.color.blue400,
});

export const content = style({
  width: themeVars.width.full,
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,

  selectors: {
    '& h1': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
      fontSize: '2rem',
    },
    '& h2': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
      fontSize: '1.75rem',
    },
    '& h3': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    '& h4': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
    },
    '& h5': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
    },
    '& h6': {
      marginTop: '1.6rem',
      marginBottom: '0.8rem',
      fontWeight: 'bold',
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    '& ul': {
      marginLeft: '2rem',
      marginBottom: '1rem',
    },
    '& ol': {
      marginLeft: '2rem',
      marginBottom: '1rem',
    },
    '& li': {
      marginBottom: '0.5rem',
    },
    '& blockquote': {
      borderLeft: `4px solid ${themeVars.color.grey300}`,
      paddingLeft: '1.6rem',
      marginLeft: 0,
      marginBottom: '1rem',
      fontStyle: 'italic',
      color: themeVars.color.grey600,
    },
    '& code': {
      backgroundColor: themeVars.color.grey100,
      padding: '0.2rem 0.4rem',
      borderRadius: '4px',
      fontSize: '0.9em',
      fontFamily: 'monospace',
    },
    '& pre': {
      backgroundColor: themeVars.color.grey100,
      padding: '1.6rem',
      borderRadius: '8px',
      overflow: 'auto',
      marginBottom: '1rem',
    },
    '& pre code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
    '& a': {
      color: themeVars.color.blue500,
      textDecoration: 'underline',
    },
    '& a:hover': {
      color: themeVars.color.blue600,
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      marginBottom: '1rem',
    },
    '& hr': {
      border: 'none',
      borderTop: `1px solid ${themeVars.color.grey300}`,
      margin: '2rem 0',
    },
  },
});
