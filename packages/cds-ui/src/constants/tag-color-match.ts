import { color } from '@cds/token/v2';

const { tag } = color;

interface TagColorStyle {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
}

export const TAG_COLOR_MATCH = {
  grey: { backgroundColor: tag.default_bg, textColor: tag.default_text },
  rose: { backgroundColor: tag.rose_bg, textColor: tag.rose_text },
  orange: { backgroundColor: tag.orange_bg, textColor: tag.orange_text },
  amber: { backgroundColor: tag.amber_bg, textColor: tag.amber_text },
  lime: { backgroundColor: tag.lime_bg, textColor: tag.lime_text },
  green: { backgroundColor: tag.green_bg, textColor: tag.green_text },
  teal: { backgroundColor: tag.teal_bg, textColor: tag.teal_text },
  cyan: { backgroundColor: tag.cyan_bg, textColor: tag.cyan_text },
  sky: { backgroundColor: tag.sky_bg, textColor: tag.sky_text },
  violet: { backgroundColor: tag.violet_bg, textColor: tag.violet_text },
  magenta: { backgroundColor: tag.magenta_bg, textColor: tag.magenta_text },
  none: {
    backgroundColor: 'transparent',
    textColor: tag.system_subtle_text,
    borderColor: tag.system_subtle_border,
  },
} as const;

export type TagColorType = keyof typeof TAG_COLOR_MATCH;

export const getTagColor = (name?: string): TagColorStyle =>
  TAG_COLOR_MATCH[name as TagColorType] ?? TAG_COLOR_MATCH.none;
