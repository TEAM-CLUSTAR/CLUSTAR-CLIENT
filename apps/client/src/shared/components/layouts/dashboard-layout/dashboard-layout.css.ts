import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const root = style({
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundColor: themeVars.color.grey50,
});

export const content = style({
  zIndex: themeVars.zIndex.sidebar,
  display: 'flex',
});

export const mainContent = recipe({
  base: {
    flexGrow: 1,
    height: '100vh',
    minWidth: 0,
    overflow: 'auto',
    transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  variants: {
    isAiPanelOpen: {
      true: {
        marginRight: '48rem',
      },
      false: {
        marginRight: 0,
      },
    },
  },
});

export const aiPanelFab = style({
  position: 'fixed',
  right: '4.4rem',
  bottom: '5.4rem',
  zIndex: themeVars.zIndex.modalContent,
});
