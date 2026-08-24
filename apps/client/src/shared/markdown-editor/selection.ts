/**
 * contentEditable 안의 선택·범위 조작.
 *
 * 경계로 삼을 엘리먼트와 태그 이름만 받아 그 안에서 커서와 서식을 다룬다.
 * 무엇을 편집하는 문서인지는 모른다.
 */

/** 선택이 이 엘리먼트 안에 있을 때만 범위를 돌려준다. */
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

/** 커서가 놓인 단어까지 선택을 넓힌다. 단어 위가 아니면 넓히지 않는다. */
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

/** 이 노드를 감싸고 있는 서식 태그. 경계 밖까지 올라가지는 않는다. */
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

  // 같은 태그가 중첩되지 않도록 안쪽 것을 걷어낸다.
  for (const nested of Array.from(wrapper.querySelectorAll(tagName))) {
    nested.replaceWith(...Array.from(nested.childNodes));
  }

  selectNodes([wrapper]);
};

/**
 * 서식을 벗긴다. 일부만 선택했으면 앞뒤는 서식을 유지해야 하므로 셋으로 나눈다.
 *
 * 앞 조각을 먼저 떼어내면 range가 가리키던 텍스트 노드의 데이터가 줄어들지만,
 * Range는 live 객체라 CharacterData가 바뀌면 boundary offset도 함께 보정된다.
 * 그래서 뒤 조각을 뗄 때 쓰는 range.endOffset은 stale이 아니다. 이걸 모르고
 * offset을 미리 복사해 두면 오히려 어긋난다.
 */
const unwrapSelection = (element: HTMLElement, range: Range): void => {
  // element에서 선택 바깥쪽 한 조각을 떼어내 같은 서식으로 다시 감싼다.
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
  // 앞뒤를 떼어낸 element에는 서식을 벗을 부분만 남는다.
  const unwrapped = Array.from(element.childNodes);

  element.replaceWith(
    ...[before, ...unwrapped, after].filter((node) => node !== null),
  );
  selectNodes(unwrapped);
};

/** 선택에 서식 태그를 건다. 이미 그 서식 안이면 벗긴다. */
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
