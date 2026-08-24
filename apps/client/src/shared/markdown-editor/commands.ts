/**
 * 마크다운 문서 모델. 마크다운 문자열 ↔ Block[] ↔ HTML 변환을 전부 맡는다.
 * React와 DOM은 모른다. 문법 기준은 CommonMark 0.31.2.
 */

type BlockSpec = {
  label: string;
  /** 이 블록을 그릴 태그 */
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

/** 지원하는 블록 문법 전부. 엔트리를 추가하면 파싱·직렬화·렌더링·입력 규칙이 따라온다. */
export const MARKDOWN_SPECS = {
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

/** 블록 종류를 담는 DOM 속성. 렌더링·직렬화·스타일링의 공통 기준점이다. */
export const BLOCK_ATTRIBUTE = 'data-block';

const CODE_SPAN_MARKER = '`';

/** 인라인 태그 ↔ 마커 대응. DOM 순회 쪽에서 역방향으로 쓴다. */
export const INLINE_TAGS: Readonly<Record<string, string>> = {
  strong: '**',
  b: '**',
  em: '*',
  i: '*',
  code: CODE_SPAN_MARKER,
};

/**
 * 인라인 서식을 마커로 감싼다. `** 굵게**`는 강조로 파싱되지 않으므로(6.2) 마커
 * 안쪽의 공백은 바깥으로 밀어낸다. 코드 스팬은 공백도 내용이라 건드리지 않는다(6.1).
 */
export const wrapInline = (marker: string, text: string): string => {
  if (text.length === 0) {
    return '';
  }
  if (marker === CODE_SPAN_MARKER) {
    return `${marker}${text}${marker}`;
  }

  const leadingLength = text.length - text.trimStart().length;
  const trailingLength = text.length - text.trimEnd().length;

  // 공백뿐인 서식은 감쌀 내용이 없다. 마커를 붙이면 빈 강조만 남는다.
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

/**
 * 스펙 테이블 순회용 목록. `Object.entries`가 넓혀버린 타입을 선언 그대로 되돌린다.
 * 이 단언을 한 곳에만 두려고 만든 상수다.
 */
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

/** 같은 뜻으로 인식하는 마커 전부. 기본 마커가 항상 첫 번째다. */
const getMarkers = (spec: BlockSpec): string[] =>
  spec.syntax === null ? [] : [spec.syntax, ...(spec.aliases ?? [])];

/** 마커 문자열 → 블록 종류. 입력 규칙이 조회로 끝나게 하는 표다. */
const MARKER_TO_TYPE: ReadonlyMap<string, BlockType> = new Map(
  SPEC_ENTRIES.flatMap(([type, spec]) =>
    getMarkers(spec).map((marker): [string, BlockType] => [marker, type]),
  ),
);

type MarkerEntry = {
  type: BlockType;
  /** 정렬 기준. 기본 마커가 길수록 먼저 시도해야 한다. */
  markerLength: number;
  /** 줄 전체에 매칭. 마커 뒤에는 공백이 오거나 줄이 끝나야 한다 (CommonMark 4.2) */
  pattern: RegExp;
};

const buildMarkerEntries = (): MarkerEntry[] => {
  const entries: MarkerEntry[] = [];

  for (const [type, spec] of SPEC_ENTRIES) {
    // 구분선과 숫자 리스트는 마커가 고정된 문자열이 아니라 전용 패턴이 따로 있다.
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

  // `###`가 `#`보다 먼저 시도돼야 제목3이 제목1로 잘리지 않는다.
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
 * 한 줄이 한 블록이다. 줄과 블록이 1:1이어야 커서 동작이 예측 가능하고
 * parse → serialize 왕복도 보존된다.
 */
export const parseMarkdown = (markdown: string): Block[] => {
  const blocks = markdown.replace(/\r\n?/g, '\n').split('\n').map(parseLine);

  // 편집기에는 커서를 둘 블록이 최소 하나 있어야 한다.
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
      // 텍스트 줄 바로 다음의 `---`는 구분선이 아니라 제목으로 파싱된다(4.1).
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
  /** 안쪽을 다시 파싱하지 않는다 (코드 스팬은 내용이 문자 그대로다) */
  literal?: boolean;
};

const INLINE_RULES: InlineRule[] = [
  // 안쪽에 홑별표(기울임)는 허용하고 겹별표만 닫는 것으로 본다.
  { pattern: /\*\*((?:[^*]|\*(?!\*))+?)\*\*/, tag: 'strong' },
  { pattern: /(?<!\*)\*([^*]+?)\*(?!\*)/, tag: 'em' },
  { pattern: /`([^`]+?)`/, tag: 'code', literal: true },
];

/**
 * 태그에 붙일 클래스. 어떻게 보이는지는 이 파일이 정하지 않고 받아만 쓴다.
 */
export type TagClassNames = Partial<Record<BlockType | 'code', string>>;

const classAttribute = (className: string | undefined): string =>
  className === undefined ? '' : ` class="${className}"`;

/** `**굵게**` → `<strong>굵게</strong>`. 마커는 화면에서 사라진다. */
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

/** 빈 블록에도 커서를 둘 수 있어야 하므로 `<br>`로 채운다. */
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

/**
 * 블록 시작부터 커서까지가 마커뿐일 때 어떤 블록이 되는지. 공백이 입력되기 전에
 * 호출하므로 패턴에 공백은 없다. 예: `#` → heading1, `1)` → ordered
 */
export const matchInputRule = (typed: string): BlockType | null => {
  // 숫자 리스트만 마커가 고정 문자열이 아니다 (`1.`, `2)`, `17.`).
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

/** Enter를 눌렀을 때 다음 줄이 될 블록 종류. 제목 다음은 본문이다. */
export const getNextBlockType = (type: BlockType): BlockType =>
  getSpec(type).continues === true ? type : DEFAULT_BLOCK_TYPE;

/** 본문 텍스트를 갖지 않는 블록인지 (구분선). */
export const isStandaloneBlock = (type: BlockType): boolean =>
  getSpec(type).standalone === true;

/* -------------------------------------------------------------------------- */
/* 커맨드 메타데이터                                                            */
/* -------------------------------------------------------------------------- */

export type MarkdownCommand = {
  id: BlockType;
  label: string;
  /** 툴바 힌트로 보여줄 문법 (`#`, `1.`) */
  syntax: string;
};

/** 툴바가 순회할 목록. 결과가 고정이라 모듈 로드 시 한 번만 계산한다. */
export const MARKDOWN_COMMANDS: readonly MarkdownCommand[] = SPEC_ENTRIES.map(
  ([type, spec]) => ({
    id: type,
    label: spec.label,
    syntax: spec.syntax ?? '',
  }),
);
