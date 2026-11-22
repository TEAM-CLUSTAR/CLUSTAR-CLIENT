import { style } from '@vanilla-extract/css';

import { color, spacing, typography } from '@cds/token/v2';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
});

export const main = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

// TODO: 일러스트 요소의 크기·위치가 Figma 하드코딩 값
export const stage = style({
  position: 'relative',
  flexShrink: 0,
  width: '83.57rem',
  height: '48.29rem',
  translate: '-1.92rem -0.36rem',
});

const illustration = style({
  position: 'absolute',
  display: 'block',
  maxWidth: 'none',
});

export const connectorL = style([
  illustration,
  { left: '18.57rem', top: '19.38rem', width: '7.6447rem', height: '6.171rem' },
]);

export const connectorR = style([
  illustration,
  {
    left: '62.28rem',
    top: '39.53rem',
    width: '5.4605rem',
    height: '0.1645rem',
  },
]);

export const memoL = style([
  illustration,
  { left: '-2.37rem', top: '12.69rem', width: '23.4rem', height: '15.7rem' },
]);

export const memoR = style([
  illustration,
  { left: '65.37rem', top: '32.83rem', width: '20.6rem', height: '15.7rem' },
]);

export const folderBack = style([
  illustration,
  { left: '24.05rem', top: '19.54rem', width: '38.3rem', height: '26.8rem' },
]);

const port = style([illustration, { width: '1.0526rem', height: '1.0526rem' }]);

export const portMemoL = style([port, { left: '18.04rem', top: '18.94rem' }]);

export const portLoginSection = style([
  port,
  { left: '25.69rem', top: '24.94rem' },
]);

export const portMemoR = style([port, { left: '67.21rem', top: '39.08rem' }]);

export const sparkLg = style([
  illustration,
  { left: '61.12rem', top: 0, width: '2.3684rem', height: '2.3684rem' },
]);

export const sparkSm = style([
  illustration,
  { left: '64.12rem', top: '3.6rem', width: '1.3158rem', height: '1.3158rem' },
]);

export const folderFront = style([
  illustration,
  { left: '20.07rem', top: '25.66rem', width: '46.2rem', height: '27.2rem' },
]);

export const folderLines = style([
  illustration,
  {
    left: '26.45rem',
    top: '40.73rem',
    width: '13.2895rem',
    height: '3.8158rem',
  },
]);

export const loginSection = style({
  position: 'absolute',
  left: '26.21rem',
  top: '3.64rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[24],
  width: '34rem',
  // TODO: 하단 여백(76px)과 좌우 여백(28px)이 v2 spacing에 없어 추후 추가 예정
  padding: `${spacing[32]} 2.8rem 7.6rem`,
  overflow: 'hidden',
  backgroundColor: color.bg.canvas,
  // TODO: 테두리 색(#ECEDF0)이 v2에 없어 추후 추가 예정
  border: '0.1316rem solid #ECEDF0',
  // TODO: border-radius가 v2에 없어 추후 추가 예정
  borderRadius: '1.8421rem',
  boxShadow:
    '0 1.0526rem 3.1579rem -0.7895rem rgba(18, 22, 40, 0.06), 0 0.1316rem 0.2632rem 0 rgba(18, 22, 40, 0.04)',
});

export const titleDescriptionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[2],
  whiteSpace: 'nowrap',
});

export const title = style({
  ...typography.title_lg,
  color: color.text.primary,
});

export const description = style({
  ...typography.body_md,
  color: color.text.secondary,
});

// TODO: Figma에서 v2 typography 미적용 (12px Medium, line-height 150%)
export const infoText = style({
  ...typography.label_sm,
  lineHeight: 1.5,
  width: '100%',
  textAlign: 'center',
  // TODO: v1 grey_600(#76767C) 사용 중, v2 토큰으로 교체 필요
  color: '#76767C',
});

export const infoLink = style({
  // TODO: Figma에서 #595959로 하드코딩
  color: '#595959',
  textDecoration: 'underline',
  textDecorationSkipInk: 'none',
  textUnderlinePosition: 'from-font',
});
