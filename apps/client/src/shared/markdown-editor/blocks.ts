/**
 * 블록 엘리먼트를 읽고, 만들고, 고친다. React를 모른다.
 *
 * commands.ts가 마크다운 문자열 모델이라면 여기는 그 모델의 DOM 표현이다.
 * 편집 영역의 노드는 브라우저와 이 파일이 만들고, React는 그 안을 렌더링하지 않는다.
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

/** 에디터가 만드는 태그에 붙일 클래스. 블록 모양은 이 에디터가 정한다. */
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
    // 빈 블록을 채우는 마지막 <br>은 내용이 아니라 자리 표시자다.
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

  // 빈 서식 태그는 마커만 남기지 않고 통째로 버린다 (`****` 방지).
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
      // 조합(IME) 중에는 normalizeBlocks를 건너뛰어 감싸이지 않은 텍스트가 남는다.
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

/* -------------------------------------------------------------------------- */
/* 커서 · 블록 조작                                                             */
/* -------------------------------------------------------------------------- */

export const createBlockElement = (block: Block): HTMLElement | null => {
  const template = document.createElement('div');
  template.innerHTML = blocksToHtml([block], TAG_CLASS_NAMES);

  return template.firstElementChild as HTMLElement | null;
};

/** 선택이 걸쳐 있는 최상위 블록 엘리먼트 */
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

/**
 * Cmd+B 같은 서식 토글. 한 블록 안의 선택일 때만 적용한다.
 *
 * 폐기된 `execCommand`는 브라우저마다 다른 마크업을 만들어(<b>, <span style>)
 * INLINE_TAGS에 없는 태그가 섞이면 직렬화에서 서식이 사라진다.
 */
export const toggleInline = (
  container: HTMLElement,
  tagName: string,
): boolean => {
  const range = getSelectionRange(container);
  if (range === null) {
    return false;
  }
  // 커서만 있으면 감쌀 글자가 없으므로 커서가 놓인 단어를 대상으로 삼는다.
  if (range.collapsed && !expandToWord(range)) {
    return false;
  }

  // 블록을 넘어선 선택을 감싸면 <strong> 안에 <p>가 들어간다.
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

/** 빈 블록에 커서를 둘 수 있도록 <br>을 넣는다. 길이 0인 텍스트 노드는 커서를 못 받는다. */
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

/** 블록의 종류를 바꾼다. 자식을 옮기는 방식이라 인라인 서식은 살아남는다. */
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

/**
 * 브라우저가 깨뜨린 구조를 "최상위 자식은 항상 블록 엘리먼트"로 되돌린다.
 * 입력 규칙도 Enter도 직렬화도 전부 이 전제 위에 있다.
 */
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

    // 블록 자리에 놓인 엘리먼트는 줄 하나다. 자식을 그대로 살려 본문으로 바꾼다.
    wrapFragments();
    convertBlock(child as HTMLElement, DEFAULT_BLOCK_TYPE);
  }
  wrapFragments();

  if (container.childNodes.length > 0) {
    return;
  }

  // 블록이 하나도 남지 않았다. 커서를 둘 자리를 만든다.
  const paragraph = createBlockElement({ type: DEFAULT_BLOCK_TYPE, text: '' });
  if (paragraph === null) {
    return;
  }

  container.appendChild(paragraph);
  // 포커스가 없을 때 선택을 옮기면 사용자가 보던 다른 선택을 빼앗는다.
  if (document.activeElement === container) {
    placeCaretAtStart(paragraph);
  }
};

/**
 * 삭제로 비워진 블록을 기본 블록으로 되돌린다. 브라우저가 첫 블록을 껍데기로
 * 남기는 탓에 "다 지웠는데 첫 줄이 계속 제목"인 상태가 되는 걸 막는다.
 */
export const resetEmptiedBlocks = (
  container: HTMLElement,
  blocks: HTMLElement[],
): void => {
  const range = getSelectionRange(container);

  for (const block of blocks) {
    // 통째로 지워진 블록은 되돌릴 것이 없다.
    if (!container.contains(block)) {
      continue;
    }

    const type = readBlockType(block);
    // 구분선은 원래 본문이 없어서 "비었다"로 판단할 수 없다.
    if (type === DEFAULT_BLOCK_TYPE || isStandaloneBlock(type)) {
      continue;
    }
    if ((block.textContent ?? '').length > 0) {
      continue;
    }

    // 엘리먼트를 갈아끼우면 선택이 사라지므로 미리 확인해 둔다.
    const hasCaret = range !== null && block.contains(range.startContainer);
    const converted = convertBlock(block, DEFAULT_BLOCK_TYPE);
    if (converted !== null && hasCaret) {
      placeCaretAtStart(converted);
    }
  }
};

/** 커서 위치에서 블록을 쪼갠다. 뒤쪽 내용은 새 블록으로 옮겨간다. */
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

/** 본문 없는 블록으로 갈아끼우고, 이어서 커서를 둘 빈 본문 줄을 만든다. */
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

/** 내용이 비었는지 표시한다. placeholder가 이 속성을 보고 그려진다. */
export const markEmptiness = (
  container: HTMLElement,
  markdown: string,
): void => {
  container.setAttribute(
    'data-empty',
    markdown.length === 0 ? 'true' : 'false',
  );
};

/** 마크다운을 편집 영역에 그린다. */
export const renderMarkdown = (
  container: HTMLElement,
  markdown: string,
): void => {
  container.innerHTML = blocksToHtml(parseMarkdown(markdown), TAG_CLASS_NAMES);
  markEmptiness(container, markdown);
};

/** 편집 영역의 현재 내용을 마크다운으로 읽는다. */
export const readMarkdown = (container: HTMLElement): string =>
  serializeBlocks(readBlocks(container));
