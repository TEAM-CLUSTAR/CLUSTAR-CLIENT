/**
 * contentEditable 안의 선택·범위 조작. 경계 엘리먼트와 태그 이름만 받으며,
 * 무엇을 편집하는 문서인지는 모른다.
 */

export const getSelectionRange = (element: HTMLElement): Range | null => {
  const selection = window.getSelection();
  if (selection === null || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);

  return element.contains(range.startContainer) ? range : null;
};

export const getTextBeforeCaret = (
  element: HTMLElement,
  range: Range,
): string => {
  const probe = range.cloneRange();
  probe.selectNodeContents(element);
  probe.setEnd(range.startContainer, range.startOffset);

  return probe.toString();
};

export const getTextAfterCaret = (
  element: HTMLElement,
  range: Range,
): string => {
  const probe = range.cloneRange();
  probe.selectNodeContents(element);
  probe.setStart(range.endContainer, range.endOffset);

  return probe.toString();
};

export const deleteBeforeCaret = (element: HTMLElement, range: Range): void => {
  const doomed = document.createRange();
  doomed.selectNodeContents(element);
  doomed.setEnd(range.startContainer, range.startOffset);
  doomed.deleteContents();
};

const applySelection = (build: (range: Range) => void): void => {
  const range = document.createRange();
  build(range);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export const placeCaretAtStart = (element: HTMLElement): void =>
  applySelection((range) => {
    range.selectNodeContents(element);
    range.collapse(true);
  });

const selectNodes = (nodes: Node[]): void => {
  const [first] = nodes;
  const last = nodes[nodes.length - 1];
  if (first === undefined || last === undefined) {
    return;
  }

  applySelection((range) => {
    range.setStartBefore(first);
    range.setEndAfter(last);
  });
};

export const expandToWord = (range: Range): boolean => {
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) {
    return false;
  }

  const text = node.textContent ?? '';
  const isWordCharacter = (index: number) => /\S/.test(text[index] ?? '');

  let start = range.startOffset;
  let end = range.startOffset;
  while (start > 0 && isWordCharacter(start - 1)) {
    start -= 1;
  }
  while (end < text.length && isWordCharacter(end)) {
    end += 1;
  }
  if (start === end) {
    return false;
  }

  range.setStart(node, start);
  range.setEnd(node, end);

  return true;
};

const findInlineAncestor = (
  boundary: HTMLElement,
  node: Node,
  tagName: string,
): HTMLElement | null => {
  const from =
    node instanceof Element ? node : (node.parentElement ?? boundary);
  const found = from.closest(tagName);

  return found instanceof HTMLElement && boundary.contains(found)
    ? found
    : null;
};

const wrapSelection = (range: Range, tagName: string): void => {
  const wrapper = document.createElement(tagName);
  wrapper.appendChild(range.extractContents());
  range.insertNode(wrapper);

  for (const nested of Array.from(wrapper.querySelectorAll(tagName))) {
    nested.replaceWith(...Array.from(nested.childNodes));
  }

  selectNodes([wrapper]);
};

/** 선택 구간의 서식만 벗기고 앞뒤는 서식을 유지한다. */
const unwrapSelection = (element: HTMLElement, range: Range): void => {
  const sliceOff = (
    moveBoundary: (slice: Range) => void,
  ): HTMLElement | null => {
    const slice = range.cloneRange();
    slice.selectNodeContents(element);
    moveBoundary(slice);

    const content = slice.extractContents();
    if ((content.textContent ?? '').length === 0) {
      return null;
    }

    const kept = document.createElement(element.tagName);
    kept.appendChild(content);

    return kept;
  };

  const before = sliceOff((slice) =>
    slice.setEnd(range.startContainer, range.startOffset),
  );
  const after = sliceOff((slice) =>
    slice.setStart(range.endContainer, range.endOffset),
  );
  const unwrapped = Array.from(element.childNodes);

  element.replaceWith(
    ...[before, ...unwrapped, after].filter((node) => node !== null),
  );
  selectNodes(unwrapped);
};

export const toggleFormat = (
  boundary: HTMLElement,
  range: Range,
  tagName: string,
): void => {
  const existing = findInlineAncestor(boundary, range.startContainer, tagName);
  if (existing !== null && existing.contains(range.endContainer)) {
    unwrapSelection(existing, range);

    return;
  }

  wrapSelection(range, tagName);
};
