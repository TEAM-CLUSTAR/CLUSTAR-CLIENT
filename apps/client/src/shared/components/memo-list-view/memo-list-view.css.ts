import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  whiteSpace: 'nowrap',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  padding: '0',
});
