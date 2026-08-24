/**
 * contentEditable 편집은 브라우저가 하고 우리는 그 결과를 정리한다. jsdom에는
 * 편집 동작이 없으므로, 브라우저가 하는 일(선택 범위의 내용 제거)을 직접 흉내내고
 * 그 전후에 오는 beforeinput / input 이벤트만 실제로 발생시킨다.
 */
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MarkdownEditor } from './MarkdownEditor';

/** 실제 사용처처럼 value/onChange를 이어 붙인다. */
const renderEditor = (initialValue: string) => {
  const Harness = () => {
    const [value, setValue] = useState(initialValue);

    return (
      <MarkdownEditor value={value} onChange={setValue}>
        <MarkdownEditor.Input />
      </MarkdownEditor>
    );
  };

  render(<Harness />);

  return screen.getByRole('textbox');
};

/** 클래스는 스타일 관심사라 구조를 볼 때는 걷어낸다. */
const structure = (editor: HTMLElement) =>
  editor.innerHTML.replace(/ class="[^"]*"/g, '');

const selectAll = (editor: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(editor);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

/** 브라우저의 선택 삭제: beforeinput → 내용 제거 → input */
const deleteSelection = (editor: HTMLElement, inputType: string) => {
  fireEvent(
    editor,
    new InputEvent('beforeinput', { bubbles: true, inputType }),
  );

  // Chrome은 선택 범위의 첫 블록 엘리먼트를 껍데기로 남기고 나머지를 지운다.
  const survivor = editor.firstElementChild;
  while (editor.lastElementChild !== survivor) {
    editor.lastElementChild?.remove();
  }
  survivor?.replaceChildren(document.createElement('br'));

  fireEvent.input(editor);
};

describe('선택 삭제 후 블록 종류', () => {
  it('내용을 전부 지우면 제목 껍데기가 남지 않는다', () => {
    const editor = renderEditor('# 제목');

    selectAll(editor);
    deleteSelection(editor, 'deleteContentBackward');

    expect(structure(editor)).toBe('<p data-block="paragraph"><br></p>');
    expect(editor.getAttribute('data-empty')).toBe('true');
  });

  it('여러 줄을 지워도 마찬가지다', () => {
    const editor = renderEditor('# 제목\n> 인용\n본문');

    selectAll(editor);
    deleteSelection(editor, 'deleteContentBackward');

    expect(structure(editor)).toBe('<p data-block="paragraph"><br></p>');
  });

  it('잘라내기도 같은 경로로 처리한다', () => {
    const editor = renderEditor('- 항목');

    selectAll(editor);
    deleteSelection(editor, 'deleteByCut');

    expect(structure(editor)).toBe('<p data-block="paragraph"><br></p>');
  });

  it('내용이 남아 있으면 블록 종류를 유지한다', () => {
    const editor = renderEditor('# 제목');

    const heading = editor.firstElementChild;
    if (heading === null) {
      throw new Error('제목 블록이 없다');
    }

    // "제"만 선택해 지운 상황
    const range = document.createRange();
    range.selectNodeContents(heading);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    fireEvent(
      editor,
      new InputEvent('beforeinput', {
        bubbles: true,
        inputType: 'deleteContentBackward',
      }),
    );
    heading.textContent = '목';
    fireEvent.input(editor);

    expect(structure(editor)).toBe('<h1 data-block="heading1">목</h1>');
  });

  it('캐럿만 있는 삭제는 블록 종류를 건드리지 않는다', () => {
    const editor = renderEditor('# 제목');

    const heading = editor.firstElementChild;
    if (heading === null) {
      throw new Error('제목 블록이 없다');
    }

    const range = document.createRange();
    range.selectNodeContents(heading);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    fireEvent(
      editor,
      new InputEvent('beforeinput', {
        bubbles: true,
        inputType: 'deleteContentBackward',
      }),
    );
    heading.replaceChildren(document.createElement('br'));
    fireEvent.input(editor);

    // 빈 제목 줄은 그대로 두고, 서식 해제는 Backspace 한 번 더에 맡긴다.
    expect(structure(editor)).toBe('<h1 data-block="heading1"><br></h1>');
  });
});

describe('브라우저가 깨뜨린 구조 복구', () => {
  it('마지막 블록까지 지워지면 커서를 둘 본문 블록을 만든다', () => {
    const editor = renderEditor('# 제목');

    // 빈 줄에서 Backspace를 한 번 더 누르면 Chrome은 블록 엘리먼트째 지운다.
    editor.replaceChildren();
    fireEvent.input(editor);

    expect(structure(editor)).toBe('<p data-block="paragraph"><br></p>');
    expect(editor.getAttribute('data-empty')).toBe('true');
  });

  it('컨테이너 바로 밑에 생긴 텍스트를 본문 블록으로 감싼다', () => {
    const editor = renderEditor('');

    // 블록이 없는 상태에서 입력하면 텍스트 노드가 컨테이너 직계 자식으로 들어간다.
    editor.replaceChildren(document.createTextNode('#'));
    fireEvent.input(editor);

    expect(structure(editor)).toBe('<p data-block="paragraph">#</p>');
  });

  it('감싸는 동안 인라인 서식은 잃지 않는다', () => {
    const editor = renderEditor('');

    const strong = document.createElement('strong');
    strong.textContent = '굵게';
    editor.replaceChildren(document.createTextNode('앞 '), strong);
    fireEvent.input(editor);

    expect(structure(editor)).toBe(
      '<p data-block="paragraph">앞 <strong>굵게</strong></p>',
    );
  });

  it('브라우저가 만든 div는 본문 블록으로 바꾼다', () => {
    const editor = renderEditor('본문');

    const div = document.createElement('div');
    div.textContent = '새 줄';
    editor.appendChild(div);
    fireEvent.input(editor);

    expect(structure(editor)).toBe(
      '<p data-block="paragraph">본문</p><p data-block="paragraph">새 줄</p>',
    );
  });

  it('구조가 멀쩡하면 아무것도 건드리지 않는다', () => {
    const editor = renderEditor('# 제목\n본문');
    const before = structure(editor);

    fireEvent.input(editor);

    expect(structure(editor)).toBe(before);
  });
});

/** 브라우저의 글자 입력: 블록에 텍스트를 넣고 캐럿을 그 끝에 둔다. */
const typeText = (editor: HTMLElement, text: string) => {
  const block = editor.firstElementChild;
  if (block === null) {
    throw new Error('블록이 없다');
  }

  block.textContent = text;
  fireEvent.input(editor);

  const range = document.createRange();
  range.selectNodeContents(block);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

describe('입력 규칙', () => {
  it('세 번째 하이픈을 치는 순간 구분선이 된다', () => {
    const editor = renderEditor('');

    typeText(editor, '--');
    const event = fireEvent.keyDown(editor, { key: '-' });

    // 하이픈이 글자로 들어가지 않도록 브라우저 기본 동작을 막는다.
    expect(event).toBe(false);
    expect(structure(editor)).toBe(
      '<hr data-block="divider"><p data-block="paragraph"><br></p>',
    );
  });

  it('하이픈이 모자라면 그대로 글자로 남는다', () => {
    const editor = renderEditor('');

    typeText(editor, '-');
    const event = fireEvent.keyDown(editor, { key: '-' });

    expect(event).toBe(true);
    expect(structure(editor)).toBe('<p data-block="paragraph">-</p>');
  });

  it('앞에 글자가 있으면 구분선으로 보지 않는다', () => {
    const editor = renderEditor('');

    typeText(editor, '가--');
    const event = fireEvent.keyDown(editor, { key: '-' });

    expect(event).toBe(true);
    expect(structure(editor)).toBe('<p data-block="paragraph">가--</p>');
  });

  it('캐럿 뒤에 글자가 남아 있으면 마커를 먹지 않는다', () => {
    const editor = renderEditor('');

    typeText(editor, '--abc');

    // 캐럿을 `--`와 `abc` 사이에 둔다.
    const block = editor.firstElementChild;
    const text = block?.firstChild;
    if (text === null || text === undefined) {
      throw new Error('텍스트 노드가 없다');
    }
    const range = document.createRange();
    range.setStart(text, 2);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const event = fireEvent.keyDown(editor, { key: '-' });

    // 구분선이 될 수 없는 자리다. 판단을 포기했으면 지운 것도 없어야 한다.
    expect(event).toBe(true);
    expect(structure(editor)).toBe('<p data-block="paragraph">--abc</p>');
  });

  it('마커 뒤에 본문이 오는 문법은 여전히 공백으로 확정한다', () => {
    const editor = renderEditor('');

    typeText(editor, '#');
    expect(fireEvent.keyDown(editor, { key: '#' })).toBe(true);

    typeText(editor, '#');
    expect(fireEvent.keyDown(editor, { key: ' ' })).toBe(false);
    expect(structure(editor)).toBe('<h1 data-block="heading1"><br></h1>');
  });
});

const selectText = (node: Node, start: number, end: number) => {
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, end);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

/** 플랫폼을 가리지 않도록 두 수정자 키를 함께 누른다. */
const pressFormatShortcut = (editor: HTMLElement, key: string) =>
  fireEvent.keyDown(editor, { key, metaKey: true, ctrlKey: true });

describe('인라인 서식', () => {
  it('선택한 부분만 굵어진다', () => {
    const editor = renderEditor('가나다');

    const text = editor.firstElementChild?.firstChild;
    if (!text) {
      throw new Error('텍스트 노드가 없다');
    }
    selectText(text, 1, 2);
    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe(
      '<p data-block="paragraph">가<strong>나</strong>다</p>',
    );
  });

  it('기울임은 <em>으로 감싼다', () => {
    const editor = renderEditor('가나다');

    const text = editor.firstElementChild?.firstChild;
    if (!text) {
      throw new Error('텍스트 노드가 없다');
    }
    selectText(text, 0, 2);
    pressFormatShortcut(editor, 'i');

    expect(structure(editor)).toBe(
      '<p data-block="paragraph"><em>가나</em>다</p>',
    );
  });

  it('이미 굵은 선택을 다시 누르면 벗겨진다', () => {
    const editor = renderEditor('**나**');

    const strong = editor.querySelector('strong');
    if (strong?.firstChild == null) {
      throw new Error('굵은 글씨가 없다');
    }
    selectText(strong.firstChild, 0, 1);
    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe('<p data-block="paragraph">나</p>');
  });

  it('일부만 벗기면 앞뒤 서식은 남는다', () => {
    const editor = renderEditor('**가나다**');

    const strong = editor.querySelector('strong');
    if (strong?.firstChild == null) {
      throw new Error('굵은 글씨가 없다');
    }
    selectText(strong.firstChild, 1, 2);
    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe(
      '<p data-block="paragraph"><strong>가</strong>나<strong>다</strong></p>',
    );
  });

  it('선택 없이 누르면 커서가 놓인 단어가 굵어진다', () => {
    const editor = renderEditor('가나 다라');

    const text = editor.firstElementChild?.firstChild;
    if (!text) {
      throw new Error('텍스트 노드가 없다');
    }
    selectText(text, 4, 4);
    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe(
      '<p data-block="paragraph">가나 <strong>다라</strong></p>',
    );
  });

  it('굵은 단어 안에서 누르면 벗겨진다', () => {
    const editor = renderEditor('**가나**');

    const strong = editor.querySelector('strong');
    if (strong?.firstChild == null) {
      throw new Error('굵은 글씨가 없다');
    }
    selectText(strong.firstChild, 1, 1);
    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe('<p data-block="paragraph">가나</p>');
  });

  it('대상이 될 단어가 없으면 아무 일도 없다', () => {
    const editor = renderEditor('');

    const block = editor.firstElementChild;
    if (block === null) {
      throw new Error('블록이 없다');
    }
    const range = document.createRange();
    range.setStart(block, 0);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    pressFormatShortcut(editor, 'b');

    expect(structure(editor)).toBe('<p data-block="paragraph"><br></p>');
  });

  it('블록을 넘어선 선택은 건드리지 않고 단축키만 먹는다', () => {
    const editor = renderEditor('가나\n다라');
    const before = structure(editor);

    selectAll(editor);
    const event = pressFormatShortcut(editor, 'b');

    // 브라우저 기본 동작까지 막으므로 화면에는 아무 변화가 없다.
    expect(event).toBe(false);
    expect(structure(editor)).toBe(before);
  });
});

describe('블록 스타일', () => {
  it('에디터가 만든 블록에는 스타일 클래스가 붙는다', () => {
    const editor = renderEditor('# 제목');

    expect(editor.firstElementChild?.className).not.toBe('');
  });
});
