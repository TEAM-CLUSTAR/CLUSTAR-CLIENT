import { style } from '@vanilla-extract/css';

export const stage = style({
  position: 'relative',
  flexShrink: 0,
  width: '83.57rem',
  height: '48.29rem',
  translate: '-1.92rem -0.36rem',
});

export const cardSlot = style({
  position: 'absolute',
  left: '26.21rem',
  top: '3.64rem',
});

const layer = style({
  position: 'absolute',
  display: 'block',
  maxWidth: 'none',
});

export const connectorL = style([
  layer,
  { left: '18.57rem', top: '19.38rem', width: '7.6447rem', height: '6.171rem' },
]);

export const connectorR = style([
  layer,
  {
    left: '62.28rem',
    top: '39.53rem',
    width: '5.4605rem',
    height: '0.1645rem',
  },
]);

export const memoL = style([
  layer,
  { left: '-2.37rem', top: '12.69rem', width: '23.4rem', height: '15.7rem' },
]);

export const memoR = style([
  layer,
  { left: '65.37rem', top: '32.83rem', width: '20.6rem', height: '15.7rem' },
]);

export const folderBack = style([
  layer,
  { left: '24.05rem', top: '19.54rem', width: '38.3rem', height: '26.8rem' },
]);

const port = style([layer, { width: '1.0526rem', height: '1.0526rem' }]);

export const portMemoL = style([port, { left: '18.04rem', top: '18.94rem' }]);

export const portCard = style([port, { left: '25.69rem', top: '24.94rem' }]);

export const portMemoR = style([port, { left: '67.21rem', top: '39.08rem' }]);

export const sparkLg = style([
  layer,
  { left: '61.12rem', top: 0, width: '2.3684rem', height: '2.3684rem' },
]);

export const sparkSm = style([
  layer,
  { left: '64.12rem', top: '3.6rem', width: '1.3158rem', height: '1.3158rem' },
]);

export const folderFront = style([
  layer,
  { left: '20.07rem', top: '25.66rem', width: '46.2rem', height: '27.2rem' },
]);

export const folderLines = style([
  layer,
  {
    left: '26.45rem',
    top: '40.73rem',
    width: '13.2895rem',
    height: '3.8158rem',
  },
]);
