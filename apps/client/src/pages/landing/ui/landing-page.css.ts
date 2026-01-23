import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  backgroundColor: themeVars.color.blue25,
  height: '100vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollBehavior: 'smooth',
  scrollSnapType: 'y mandatory',
  position: 'relative',
  width: '100%',
  maxWidth: '100vw',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
});

globalStyle(`${container}::-webkit-scrollbar`, {
  display: 'none',
});

export const headerContainer = style({
  backgroundColor: themeVars.color.blue25,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '3rem 12rem',
  borderBottom: `1px solid ${themeVars.color.grey300}`,
  zIndex: 100,
  width: '100%',
  flexShrink: 0,
  alignSelf: 'stretch',
});

export const headerContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.1rem',
});

export const loginLink = style({
  color: themeVars.color.blue500,
  ...themeVars.fontStyles.title_sb_20,
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  backgroundImage: `url('/landing_bg.png')`,
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundAttachment: 'scroll',
  minHeight: '600vh',
});

export const content01 = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.8rem',
  padding: '0 0 17.5rem 0',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const content01Content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4.8rem',
});

export const content01ContentText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2.4rem',
});

export const content01SubtitleWrapper = style({
  position: 'relative',
  display: 'inline-block',
  padding: '1px',
  borderRadius: '100px',
  backgroundImage: themeVars.color.gradient01,
  '::before': {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '1px',
    right: '1px',
    bottom: '1px',
    borderRadius: '100px',
    backgroundColor: themeVars.color.blue25,
    zIndex: 0,
  },
});

export const content01Subtitle = style({
  position: 'relative',
  zIndex: 1,
  padding: '0.4rem 1.2rem',
  borderRadius: '100px',
  backgroundImage: themeVars.color.gradient01,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  ...themeVars.fontStyles.title_sb_20,
});

export const content01Title = style({
  ...themeVars.fontStyles.display_sb_42,
  color: themeVars.color.grey900,
});

export const content01TitleHighlight = style({
  color: themeVars.color.blue500,
});

export const content01Description = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey600,
  textAlign: 'center',
});

export const content01Button = style({
  borderRadius: '1.2rem',
  padding: '1.3rem 4.2rem',
  backgroundColor: themeVars.color.blue500,
  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.white,
});

export const content02 = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '7.2rem',
  padding: '29.2rem 0 22.9rem 0',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  width: '100%',
  justifyContent: 'center',
});

export const content02Text = style({
  ...themeVars.fontStyles.display_sb_42,
  color: themeVars.color.grey700,
});

export const content02Highlight = style({
  color: themeVars.color.blue500,
});

export const content03 = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '4.2rem',
  gap: '3.2rem',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  width: '100%',
  justifyContent: 'center',
});

export const content03Text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  paddingLeft: '17.2rem',
});

export const content03SubtitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  paddingLeft: '3.2rem',
  borderLeft: `4px solid ${themeVars.color.label03}`,
});

export const content03Tag = style({
  width: '11.1rem',
  height: '3.6rem',
  borderRadius: '10px',
  backgroundColor: themeVars.color.label04,
  color: themeVars.color.label03,
  ...themeVars.fontStyles.body_sb_14,
  ...themeVars.fontStyles.title_sb_24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const content03Subtitle = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey900,
});

export const contentDescription = style({
  color: themeVars.color.grey700,
  fontSize: '2.4rem',
  fontWeight: '500',
  lineHeight: '150%',
  marginLeft: '3.3rem',
});

export const content04 = style({
  display: 'flex',
  padding: '16.8rem 0 16.9rem 0',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  width: '100%',
  justifyContent: 'center',
});

export const content04Text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  paddingLeft: '5.6rem',
  marginRight: '-6.1rem',
});

export const content04SubtitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  paddingLeft: '3.2rem',
  borderLeft: `4px solid ${themeVars.color.label01}`,
});

export const content04Tag = style({
  width: '11.1rem',
  height: '3.6rem',
  borderRadius: '10px',
  backgroundColor: themeVars.color.label02,
  color: themeVars.color.label01,
  ...themeVars.fontStyles.body_sb_14,
  ...themeVars.fontStyles.title_sb_24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const content05 = style({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '16.9rem 0 15.8rem 0',
  width: '100%',
  alignSelf: 'stretch',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  alignItems: 'center',
});

export const content05Image = style({
  marginLeft: 0,
  alignSelf: 'flex-start',
});

export const content05Text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  marginLeft: '-23rem',
  marginTop: '-70rem',
});

export const content05SubtitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  paddingLeft: '3.2rem',
  borderLeft: `4px solid ${themeVars.color.label05}`,
});

export const content05Tag = style({
  width: '11.1rem',
  height: '3.6rem',
  borderRadius: '10px',
  backgroundColor: themeVars.color.label06,
  color: themeVars.color.label05,
  ...themeVars.fontStyles.body_sb_14,
  ...themeVars.fontStyles.title_sb_24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const content06 = style({
  display: 'flex',
  paddingTop: '7.1rem',
  justifyContent: 'center',
  marginLeft: '10rem',
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'normal',
  width: '100%',
  alignItems: 'center',
});

export const content06Text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  marginRight: '-46rem',
  marginTop: '-95rem',
});

export const content06SubtitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.4rem',
  paddingLeft: '3.2rem',
  borderLeft: `4px solid ${themeVars.color.label07}`,
});

export const content06Tag = style({
  width: '11.1rem',
  height: '3.6rem',
  borderRadius: '10px',
  backgroundColor: themeVars.color.label08,
  color: themeVars.color.label07,
  ...themeVars.fontStyles.body_sb_14,
  ...themeVars.fontStyles.title_sb_24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const footerContainer = style({
  padding: '3.2rem 12rem',
  borderTop: `1px solid ${themeVars.color.grey300}`,
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  width: '100%',
  flexShrink: 0,
});

export const footerContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const footerItem = style({
  display: 'flex',
  gap: '2.8rem',
  color: themeVars.color.blue500,
  ...themeVars.fontStyles.body_m_16,
});

export const footerItemText = style({
  width: '7.2rem',
});

export const scrollTopButton = style({
  position: 'fixed',
  bottom: '6.4rem',
  right: '7.2rem',
  width: '5.6rem',
  height: '5.6rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: themeVars.zIndex.button,
  boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
  padding: 0,
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: themeVars.color.blue100,
  },
});
