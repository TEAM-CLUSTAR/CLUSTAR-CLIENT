import { primitiveTypography } from './primitive';

export const typography = {
  // Display (Bold)
  display_xl: {
    fontSize: primitiveTypography.fontSize[64],
    fontWeight: primitiveTypography.fontWeight.bold,
    lineHeight: primitiveTypography.lineHeight[72],
    letterSpacing: primitiveTypography.letterSpacing[3],
  },
  display_lg: {
    fontSize: primitiveTypography.fontSize[48],
    fontWeight: primitiveTypography.fontWeight.bold,
    lineHeight: primitiveTypography.lineHeight[56],
    letterSpacing: primitiveTypography.letterSpacing[3],
  },
  display_md: {
    fontSize: primitiveTypography.fontSize[40],
    fontWeight: primitiveTypography.fontWeight.bold,
    lineHeight: primitiveTypography.lineHeight[48],
    letterSpacing: primitiveTypography.letterSpacing[3],
  },
  display_sm: {
    fontSize: primitiveTypography.fontSize[32],
    fontWeight: primitiveTypography.fontWeight.bold,
    lineHeight: primitiveTypography.lineHeight[40],
    letterSpacing: primitiveTypography.letterSpacing[2],
  },

  // Title (SemiBold)
  title_xl: {
    fontSize: primitiveTypography.fontSize[24],
    fontWeight: primitiveTypography.fontWeight.semibold,
    lineHeight: primitiveTypography.lineHeight[32],
    letterSpacing: primitiveTypography.letterSpacing[2],
  },
  title_lg: {
    fontSize: primitiveTypography.fontSize[20],
    fontWeight: primitiveTypography.fontWeight.semibold,
    lineHeight: primitiveTypography.lineHeight[28],
    letterSpacing: primitiveTypography.letterSpacing[2],
  },
  title_md: {
    fontSize: primitiveTypography.fontSize[16],
    fontWeight: primitiveTypography.fontWeight.semibold,
    lineHeight: primitiveTypography.lineHeight[24],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },
  title_sm: {
    fontSize: primitiveTypography.fontSize[14],
    fontWeight: primitiveTypography.fontWeight.semibold,
    lineHeight: primitiveTypography.lineHeight[20],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },

  // Body (Regular)
  body_lg: {
    fontSize: primitiveTypography.fontSize[16],
    fontWeight: primitiveTypography.fontWeight.regular,
    lineHeight: primitiveTypography.lineHeight[26],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },
  body_md: {
    fontSize: primitiveTypography.fontSize[14],
    fontWeight: primitiveTypography.fontWeight.regular,
    lineHeight: primitiveTypography.lineHeight[22],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },

  // Label (Medium)
  label_lg: {
    fontSize: primitiveTypography.fontSize[16],
    fontWeight: primitiveTypography.fontWeight.medium,
    lineHeight: primitiveTypography.lineHeight[24],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },
  label_md: {
    fontSize: primitiveTypography.fontSize[14],
    fontWeight: primitiveTypography.fontWeight.medium,
    lineHeight: primitiveTypography.lineHeight[20],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },
  label_sm: {
    fontSize: primitiveTypography.fontSize[12],
    fontWeight: primitiveTypography.fontWeight.medium,
    lineHeight: primitiveTypography.lineHeight[16],
    letterSpacing: primitiveTypography.letterSpacing[1],
  },
} as const;
