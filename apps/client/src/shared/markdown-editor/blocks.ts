/**
 * markdown.ts의 문자열 모델을 DOM으로 다룬다. 편집 영역의 노드는 브라우저와
 * 이 파일이 만들고, React는 그 안을 렌더링하지 않는다.
 */
import type { Block, BlockType, TagClassNames } from './markdown';
import {
  BLOCK_ATTRIBUTE,
  blocksToHtml,
  DEFAULT_BLOCK_TYPE,
  getInlineMarker,
  INLINE_TAGS,
  isBlockType,
  isStandaloneBlock,
  parseMarkdown,
  serializeBlocks,
  wrapInline,
} from './markdown';
import {
  expandToWord,
  getSelectionRange,
  placeCaretAtStart,
  toggleFormat,
} from './selection';

import * as styles from './markdown-editor.css';

/** 블록 자리에 나타나도 줄이 아니라 본문 조각으로 취급할 태그. */
const INLINE_LIKE_TAGS: ReadonlySet<string> = new Set([
  ...Object.keys(INLINE_TAGS).map((tag) => tag.toUpperCase()),
  'SPAN',
  'A',
  'BR',
]);

const TAG_CLASS_NAMES: TagClassNames = {
  paragraph: styles.paragraph,
  heading1: styles.heading1,
  heading2: styles.heading2,
  heading3: styles.heading3,
  quote: styles.quote,
  bullet: styles.bullet,
  ordered: styles.ordered,
  divider: styles.divider,
  code: styles.code,
};

/* -------------------------------------------------------------------------- */
/* 마크다운 ↔ DOM                                                              */
/* -------------------------------------------------------------------------- */

const serializeChildren = (node: Node): string => {
  const children = Array.from(node.childNodes);
  let text = '';

  children.forEach((child, index) => {
    const isFiller = child.nodeName === 'BR' && index === children.length - 1;
    if (isFiller) {
      return;
    }
    text += serializeNode(child);
  });

  return text;
};

const serializeNode = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as Element;
  if (element.tagName === 'BR') {
    return '\n';
  }

  const inner = serializeChildren(element);
  const marker = getInlineMarker(element.tagName.toLowerCase());

  if (marker === undefined) {
    return inner;
  }

  return wrapInline(marker, inner);
};

export const readBlockType = (element: Element): BlockType => {
  const attribute = element.getAttribute(BLOCK_ATTRIBUTE);

  return isBlockType(attribute) ? attribute : DEFAULT_BLOCK_TYPE;
};

const readBlocks = (container: HTMLElement): Block[] => {
  const blocks: Block[] = [];

  for (const child of Array.from(container.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? '';
      if (text.trim().length > 0) {
        blocks.push({ type: DEFAULT_BLOCK_TYPE, text });
      }
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const element = child as HTMLElement;
    const type = readBlockType(element);
    blocks.push({
      type,
      text: isStandaloneBlock(type) ? '' : serializeChildren(element),
    });
  }

  return blocks.length > 0 ? blocks : [{ type: DEFAULT_BLOCK_TYPE, text: '' }];
};

export const createBlockElement = (block: Block): HTMLElement | null => {
  const template = document.createElement('div');
  template.innerHTML = blocksToHtml([block], TAG_CLASS_NAMES);

  return template.firstElementChild as HTMLElement | null;
};

export const getBlockElement = (
  container: HTMLElement,
  node: Node | null,
): HTMLElement | null => {
  let current = node;

  while (current !== null && current !== container) {
    if (current.parentNode === container) {
      return current.nodeType === Node.ELEMENT_NODE
        ? (current as HTMLElement)
        : null;
    }
    current = current.parentNode;
  }

  return null;
};

/** Cmd+B 같은 서식 토글. 한 블록 안의 선택일 때만 적용한다. */
export const toggleInline = (
  container: HTMLElement,
  tagName: string,
): boolean => {
  const range = getSelectionRange(container);
  if (range === null) {
    return false;
  }
  if (range.collapsed && !expandToWord(range)) {
    return false;
  }

  const block = getBlockElement(container, range.startContainer);
  if (
    block === null ||
    block !== getBlockElement(container, range.endContainer)
  ) {
    return false;
  }

  toggleFormat(block, range, tagName);

  return true;
};

/** 빈 엘리먼트를 커서가 놓일 수 있는 상태로 만든다. */
export const fillIfEmpty = (element: HTMLElement): void => {
  for (const child of Array.from(element.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent === '') {
      child.remove();
    }
  }

  if (element.childNodes.length === 0) {
    element.appendChild(document.createElement('br'));
  }
};

/** 인라인 서식을 유지한 채 블록 종류를 바꾼다. */
export const convertBlock = (
  block: HTMLElement,
  type: BlockType,
): HTMLElement | null => {
  const replacement = createBlockElement({ type, text: '' });
  if (replacement === null) {
    return null;
  }

  if (!isStandaloneBlock(type)) {
    replacement.replaceChildren();
    while (block.firstChild !== null) {
      replacement.appendChild(block.firstChild);
    }
    fillIfEmpty(replacement);
  }

  block.replaceWith(replacement);

  return replacement;
};

const isBlockElement = (node: Node): boolean =>
  node.nodeType === Node.ELEMENT_NODE &&
  (node as Element).hasAttribute(BLOCK_ATTRIBUTE);

const isInlineLike = (node: Node): boolean =>
  node.nodeType !== Node.ELEMENT_NODE ||
  INLINE_LIKE_TAGS.has((node as Element).tagName);

/** 브라우저가 깨뜨린 구조를 "최상위 자식은 항상 블록 엘리먼트"로 되돌린다. */
export const normalizeBlocks = (container: HTMLElement): void => {
  let fragments: ChildNode[] = [];

  const wrapFragments = () => {
    if (fragments.length === 0) {
      return;
    }

    const paragraph = createBlockElement({
      type: DEFAULT_BLOCK_TYPE,
      text: '',
    });
    if (paragraph !== null) {
      paragraph.replaceChildren();
      fragments[0].before(paragraph);
      for (const fragment of fragments) {
        paragraph.appendChild(fragment);
      }
      fillIfEmpty(paragraph);
    }
    fragments = [];
  };

  for (const child of Array.from(container.childNodes)) {
    if (isBlockElement(child)) {
      wrapFragments();
      continue;
    }
    if (isInlineLike(child)) {
      fragments.push(child);
      continue;
    }

    wrapFragments();
    convertBlock(child as HTMLElement, DEFAULT_BLOCK_TYPE);
  }
  wrapFragments();

  if (container.childNodes.length > 0) {
    return;
  }

  const paragraph = createBlockElement({ type: DEFAULT_BLOCK_TYPE, text: '' });
  if (paragraph === null) {
    return;
  }

  container.appendChild(paragraph);
  if (document.activeElement === container) {
    placeCaretAtStart(paragraph);
  }
};

/** 삭제로 비워진 블록을 기본 블록으로 되돌린다. */
export const resetEmptiedBlocks = (
  container: HTMLElement,
  blocks: HTMLElement[],
): void => {
  const range = getSelectionRange(container);

  for (const block of blocks) {
    if (!container.contains(block)) {
      continue;
    }

    const type = readBlockType(block);
    if (type === DEFAULT_BLOCK_TYPE || isStandaloneBlock(type)) {
      continue;
    }
    if ((block.textContent ?? '').length > 0) {
      continue;
    }

    const hasCaret = range !== null && block.contains(range.startContainer);
    const converted = convertBlock(block, DEFAULT_BLOCK_TYPE);
    if (converted !== null && hasCaret) {
      placeCaretAtStart(converted);
    }
  }
};

export const splitBlockAt = (
  block: HTMLElement,
  range: Range,
  type: BlockType,
): HTMLElement | null => {
  range.deleteContents();

  const tail = range.cloneRange();
  tail.selectNodeContents(block);
  tail.setStart(range.endContainer, range.endOffset);

  const next = createBlockElement({ type, text: '' });
  if (next === null) {
    return null;
  }

  next.replaceChildren(tail.extractContents());
  fillIfEmpty(next);
  fillIfEmpty(block);
  block.after(next);

  return next;
};

/** 본문 없는 블록으로 갈아끼우고 뒤에 빈 본문 줄을 만든다. */
export const replaceWithStandalone = (
  block: HTMLElement,
  type: BlockType,
): HTMLElement | null => {
  const standalone = createBlockElement({ type, text: '' });
  const paragraph = createBlockElement({
    type: DEFAULT_BLOCK_TYPE,
    text: '',
  });
  if (standalone === null || paragraph === null) {
    return null;
  }

  block.replaceWith(standalone);
  standalone.after(paragraph);

  return paragraph;
};

/** 내용이 비었는지 data-empty 속성으로 표시한다. */
export const markEmptiness = (
  container: HTMLElement,
  markdown: string,
): void => {
  container.setAttribute(
    'data-empty',
    markdown.length === 0 ? 'true' : 'false',
  );
};

export const renderMarkdown = (
  container: HTMLElement,
  markdown: string,
): void => {
  container.innerHTML = blocksToHtml(parseMarkdown(markdown), TAG_CLASS_NAMES);
  markEmptiness(container, markdown);
};

export const readMarkdown = (container: HTMLElement): string =>
  serializeBlocks(readBlocks(container));
