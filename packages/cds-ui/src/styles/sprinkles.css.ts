import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

// @TODO v1 토큰 삭제 전 @cds/token/v2로 교체
import { color, fontStyles, zIndex } from '@cds/token';

const properties = defineProperties({
  properties: {
    color,
    fontStyles,
    zIndex,
  },
});

export const sprinkles = createSprinkles(properties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
