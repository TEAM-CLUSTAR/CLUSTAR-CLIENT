/**
 * 마크다운 문서 모델. 마크다운 문자열 ↔ Block[] ↔ HTML 변환을 전부 맡는다.
 * React와 DOM은 모른다. 문법 기준은 CommonMark 0.31.2.
 */

type BlockSpec = {
  label: string;
  tag: string;
  /** 줄 앞에 붙는 마커. null이면 마커 없이 본문만 있는 블록 */
  syntax: string | null;
  /** 같은 뜻으로 인식만 하는 다른 마커 (CommonMark 5.2) */
  aliases?: readonly string[];
  /** 마커가 줄 순번으로 바뀐다 */
  numbered?: boolean;
  /** 본문 텍스트를 갖지 않는다 */
  standalone?: boolean;
  /** Enter를 누르면 같은 종류의 블록이 이어진다 (목록·인용문) */
  continues?: boolean;
};

/** 엔트리를 추가하면 파싱·직렬화·렌더링·입력 규칙이 따라온다. */
const MARKDOWN_SPECS = {
  paragraph: { label: '본문', tag: 'p', syntax: null, continues: true },
  heading1: { label: '제목 1', tag: 'h1', syntax: '#' },
  heading2: { label: '제목 2', tag: 'h2', syntax: '##' },
  heading3: { label: '제목 3', tag: 'h3', syntax: '###' },
  quote: { label: '인용문', tag: 'blockquote', syntax: '>', continues: true },
  bullet: {
    label: '글머리',
    tag: 'p',
    syntax: '-',
    aliases: ['*', '+'],
    continues: true,
  },
  ordered: {
    label: '숫자 리스트',
    tag: 'p',
    syntax: '1.',
    numbered: true,
    continues: true,
  },
  divider: { label: '구분선', tag: 'hr', syntax: '---', standalone: true },
} as const satisfies Record<string, BlockSpec>;

export type BlockType = keyof typeof MARKDOWN_SPECS;

export type Block = {
  type: BlockType;
  /** 인라인 마크다운이 남아 있는 본문 (`안녕 **굵게**`) */
  text: string;
};

export const BLOCK_ATTRIBUTE = 'data-block';

const CODE_SPAN_MARKER = '`';

export const INLINE_TAGS = {
  strong: '**',
  b: '**',
  em: '*',
  i: '*',
  code: CODE_SPAN_MARKER,
} as const satisfies Record<string, string>;

export type InlineTag = keyof typeof INLINE_TAGS;

export const getInlineMarker = (tagName: string): string | undefined =>
  Object.prototype.hasOwnProperty.call(INLINE_TAGS, tagName)
    ? INLINE_TAGS[tagName as InlineTag]
    : undefined;

/** 인라인 서식을 마커로 감싼다. */
export const wrapInline = (marker: string, text: string): string => {
  if (text.length === 0) {
    return '';
  }
  if (marker === CODE_SPAN_MARKER) {
    return `${marker}${text}${marker}`;
  }

  const leadingLength = text.length - text.trimStart().length;
  const trailingLength = text.length - text.trimEnd().length;

  if (leadingLength === text.length) {
    return text;
  }

  const core = text.slice(leadingLength, text.length - trailingLength);

  return (
    text.slice(0, leadingLength) +
    `${marker}${core}${marker}` +
    text.slice(text.length - trailingLength)
  );
};

const getSpec = (type: BlockType): BlockSpec => MARKDOWN_SPECS[type];

/** 스펙 테이블 순회용 목록. */
const SPEC_ENTRIES: [BlockType, BlockSpec][] = Object.entries(
  MARKDOWN_SPECS,
).map(([type, spec]) => [type as BlockType, spec]);

/* -------------------------------------------------------------------------- */
/* 마크다운 → 블록                                                              */
/* -------------------------------------------------------------------------- */

const DIVIDER_PATTERN = /^ {0,3}(?:-{3,}|\*{3,}|_{3,})[ \t]*$/;
const ORDERED_PATTERN = /^[ \t]*\d+[.)](?:[ \t]+(.*))?$/;
const ORDERED_MARKER_PATTERN = /^\d+[.)]$/;

const escapeRegExp = (source: string): string =>
  source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getMarkers = (spec: BlockSpec): string[] =>
  spec.syntax === null ? [] : [spec.syntax, ...(spec.aliases ?? [])];

const MARKER_TO_TYPE: ReadonlyMap<string, BlockType> = new Map(
  SPEC_ENTRIES.flatMap(([type, spec]) =>
    getMarkers(spec).map((marker): [string, BlockType] => [marker, type]),
  ),
);

type MarkerEntry = {
  type: BlockType;
  markerLength: number;
  pattern: RegExp;
};

const buildMarkerEntries = (): MarkerEntry[] => {
  const entries: MarkerEntry[] = [];

  for (const [type, spec] of SPEC_ENTRIES) {
    if (
      spec.syntax === null ||
      spec.numbered === true ||
      spec.standalone === true
    ) {
      continue;
    }

    const alternation = getMarkers(spec).map(escapeRegExp).join('|');

    entries.push({
      type,
      markerLength: spec.syntax.length,
      pattern: new RegExp(`^[ \\t]*(?:${alternation})(?:[ \\t]+(.*))?$`),
    });
  }

  return entries.sort((left, right) => right.markerLength - left.markerLength);
};

const MARKER_ENTRIES = buildMarkerEntries();

const parseLine = (line: string): Block => {
  if (DIVIDER_PATTERN.test(line)) {
    return { type: 'divider', text: '' };
  }

  const ordered = ORDERED_PATTERN.exec(line);
  if (ordered !== null) {
    return { type: 'ordered', text: ordered[1] ?? '' };
  }

  for (const entry of MARKER_ENTRIES) {
    const match = entry.pattern.exec(line);
    if (match !== null) {
      return { type: entry.type, text: match[1] ?? '' };
    }
  }

  return { type: 'paragraph', text: line };
};

/**
 * 한 줄이 한 블록
 */
export const parseMarkdown = (markdown: string): Block[] => {
  const blocks = markdown.replace(/\r\n?/g, '\n').split('\n').map(parseLine);

  return blocks.length > 0 ? blocks : [{ type: 'paragraph', text: '' }];
};

/* -------------------------------------------------------------------------- */
/* 블록 → 마크다운                                                              */
/* -------------------------------------------------------------------------- */

export const serializeBlocks = (blocks: Block[]): string => {
  const lines: string[] = [];
  let orderedNumber = 0;

  for (const block of blocks) {
    const spec = getSpec(block.type);
    orderedNumber = spec.numbered === true ? orderedNumber + 1 : 0;

    if (spec.standalone === true) {
      const previous = lines[lines.length - 1];
      if (previous !== undefined && previous.trim() !== '') {
        lines.push('');
      }
      lines.push(spec.syntax ?? '');
      continue;
    }

    const marker = spec.numbered === true ? `${orderedNumber}.` : spec.syntax;
    lines.push(
      marker === null ? block.text : `${marker} ${block.text}`.trimEnd(),
    );
  }

  return lines.join('\n');
};

/* -------------------------------------------------------------------------- */
/* 인라인 마크다운 → HTML                                                       */
/* -------------------------------------------------------------------------- */

const escapeHtml = (text: string): string =>
  text.replace(/[&<>]/g, (character) => {
    if (character === '&') {
      return '&amp;';
    }
    if (character === '<') {
      return '&lt;';
    }

    return '&gt;';
  });

type InlineRule = {
  pattern: RegExp;
  tag: string;
  literal?: boolean;
};

const INLINE_RULES: InlineRule[] = [
  { pattern: /\*\*((?:[^*]|\*(?!\*))+?)\*\*/, tag: 'strong' },
  { pattern: /(?<!\*)\*([^*]+?)\*(?!\*)/, tag: 'em' },
  { pattern: /`([^`]+?)`/, tag: 'code', literal: true },
];

export type TagClassNames = Partial<Record<BlockType | 'code', string>>;

const classAttribute = (className: string | undefined): string =>
  className === undefined ? '' : ` class="${className}"`;

export const inlineToHtml = (
  text: string,
  classNames: TagClassNames = {},
): string => {
  let chosen: { rule: InlineRule; match: RegExpExecArray } | null = null;

  for (const rule of INLINE_RULES) {
    const match = rule.pattern.exec(text);
    if (match === null) {
      continue;
    }
    if (chosen === null || match.index < chosen.match.index) {
      chosen = { rule, match };
    }
  }

  if (chosen === null) {
    return escapeHtml(text);
  }

  const { rule, match } = chosen;
  const inner =
    rule.literal === true
      ? escapeHtml(match[1])
      : inlineToHtml(match[1], classNames);
  const attribute = rule.tag === 'code' ? classAttribute(classNames.code) : '';

  return (
    escapeHtml(text.slice(0, match.index)) +
    `<${rule.tag}${attribute}>${inner}</${rule.tag}>` +
    inlineToHtml(text.slice(match.index + match[0].length), classNames)
  );
};

const blockToHtml = (block: Block, classNames: TagClassNames): string => {
  const spec = getSpec(block.type);
  const attributes =
    `${BLOCK_ATTRIBUTE}="${block.type}"` +
    classAttribute(classNames[block.type]);

  if (spec.standalone === true) {
    return `<${spec.tag} ${attributes}>`;
  }

  const inner =
    block.text.length === 0 ? '<br>' : inlineToHtml(block.text, classNames);

  return `<${spec.tag} ${attributes}>${inner}</${spec.tag}>`;
};

export const blocksToHtml = (
  blocks: Block[],
  classNames: TagClassNames = {},
): string => blocks.map((block) => blockToHtml(block, classNames)).join('');

/* -------------------------------------------------------------------------- */
/* 입력 규칙                                                                    */
/* -------------------------------------------------------------------------- */

/** 블록 시작부터 커서까지가 마커뿐일 때 어떤 블록이 되는지. (`#` → heading1) */
export const matchInputRule = (typed: string): BlockType | null => {
  if (ORDERED_MARKER_PATTERN.test(typed)) {
    return 'ordered';
  }

  return MARKER_TO_TYPE.get(typed) ?? null;
};

/* -------------------------------------------------------------------------- */
/* 블록 종류 규칙 (DOM 레이어가 문법을 몰라도 되게 하는 최소한의 질의)          */
/* -------------------------------------------------------------------------- */

/** 마커가 없는 기본 블록. 서식을 해제하면 여기로 돌아온다. */
export const DEFAULT_BLOCK_TYPE: BlockType = 'paragraph';

export const isBlockType = (value: string | null): value is BlockType =>
  value !== null && Object.prototype.hasOwnProperty.call(MARKDOWN_SPECS, value);

export const getNextBlockType = (type: BlockType): BlockType =>
  getSpec(type).continues === true ? type : DEFAULT_BLOCK_TYPE;

export const isStandaloneBlock = (type: BlockType): boolean =>
  getSpec(type).standalone === true;

export type MarkdownCommand = {
  id: BlockType;
  label: string;
  syntax: string;
};

export const MARKDOWN_COMMANDS: readonly MarkdownCommand[] = SPEC_ENTRIES.map(
  ([type, spec]) => ({
    id: type,
    label: spec.label,
    syntax: spec.syntax ?? '',
  }),
);
