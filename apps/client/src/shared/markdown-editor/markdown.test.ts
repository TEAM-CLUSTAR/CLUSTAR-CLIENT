/**
 * @vitest-environment node
 *
 * markdown.ts는 DOM을 모르므로 jsdom 없이 문자열 in / out만 검증한다.
 * 에디터의 정확성은 결국 "마크다운 → 블록 → 마크다운" 왕복이 값을 잃지 않는지에
 * 달려 있어서, 왕복 테스트를 가장 중요하게 다룬다.
 */
import { describe, expect, it } from 'vitest';

import type { Block } from './markdown';
import {
  blocksToHtml,
  getNextBlockType,
  inlineToHtml,
  isBlockType,
  matchInputRule,
  parseMarkdown,
  serializeBlocks,
  wrapInline,
} from './markdown';

const roundTrip = (markdown: string) =>
  serializeBlocks(parseMarkdown(markdown));

describe('마크다운 → 블록', () => {
  it('제목 1~3을 구분한다', () => {
    expect(parseMarkdown('# 제목1')).toEqual([
      { type: 'heading1', text: '제목1' },
    ]);
    expect(parseMarkdown('## 제목2')).toEqual([
      { type: 'heading2', text: '제목2' },
    ]);
    expect(parseMarkdown('### 제목3')).toEqual([
      { type: 'heading3', text: '제목3' },
    ]);
  });

  it('공백 없는 `#제목`은 제목이 아니라 본문이다 (CommonMark 4.2)', () => {
    expect(parseMarkdown('#제목')).toEqual([
      { type: 'paragraph', text: '#제목' },
    ]);
  });

  it('인용문 · 글머리 · 숫자 리스트 · 구분선을 인식한다', () => {
    expect(parseMarkdown('> 인용')).toEqual([{ type: 'quote', text: '인용' }]);
    expect(parseMarkdown('- 항목')).toEqual([{ type: 'bullet', text: '항목' }]);
    expect(parseMarkdown('* 항목')).toEqual([{ type: 'bullet', text: '항목' }]);
    expect(parseMarkdown('+ 항목')).toEqual([{ type: 'bullet', text: '항목' }]);
    expect(parseMarkdown('1. 항목')).toEqual([
      { type: 'ordered', text: '항목' },
    ]);
    expect(parseMarkdown('3) 항목')).toEqual([
      { type: 'ordered', text: '항목' },
    ]);
    expect(parseMarkdown('---')).toEqual([{ type: 'divider', text: '' }]);
  });

  it('마커만 있는 줄도 해당 블록으로 인식한다', () => {
    expect(parseMarkdown('#')).toEqual([{ type: 'heading1', text: '' }]);
    expect(parseMarkdown('>')).toEqual([{ type: 'quote', text: '' }]);
  });

  it('한 줄이 한 블록이고 빈 줄도 블록으로 남는다', () => {
    expect(parseMarkdown('가\n\n나')).toEqual([
      { type: 'paragraph', text: '가' },
      { type: 'paragraph', text: '' },
      { type: 'paragraph', text: '나' },
    ]);
  });

  it('빈 문서에도 커서를 둘 블록이 하나 있다', () => {
    expect(parseMarkdown('')).toEqual([{ type: 'paragraph', text: '' }]);
  });

  it('CRLF도 같은 결과가 된다', () => {
    expect(parseMarkdown('# 제목\r\n본문')).toEqual([
      { type: 'heading1', text: '제목' },
      { type: 'paragraph', text: '본문' },
    ]);
  });

  it('인라인 마크다운은 본문에 그대로 남긴다', () => {
    expect(parseMarkdown('# 제목 **굵게**')).toEqual([
      { type: 'heading1', text: '제목 **굵게**' },
    ]);
  });
});

describe('블록 → 마크다운', () => {
  it('숫자 리스트는 이어지는 동안 다시 번호를 매긴다', () => {
    const blocks: Block[] = [
      { type: 'ordered', text: '가' },
      { type: 'ordered', text: '나' },
      { type: 'paragraph', text: '사이' },
      { type: 'ordered', text: '다' },
    ];

    expect(serializeBlocks(blocks)).toBe('1. 가\n2. 나\n사이\n1. 다');
  });

  it('구분선 앞에는 빈 줄을 넣어 setext heading이 되는 것을 막는다', () => {
    const blocks: Block[] = [
      { type: 'paragraph', text: '안녕하세요' },
      { type: 'divider', text: '' },
    ];

    expect(serializeBlocks(blocks)).toBe('안녕하세요\n\n---');
  });

  it('이미 빈 줄이 있으면 중복해서 넣지 않는다', () => {
    const blocks: Block[] = [
      { type: 'paragraph', text: '안녕' },
      { type: 'paragraph', text: '' },
      { type: 'divider', text: '' },
    ];

    expect(serializeBlocks(blocks)).toBe('안녕\n\n---');
  });

  it('본문이 빈 블록은 마커만 남기고 뒤 공백을 붙이지 않는다', () => {
    expect(serializeBlocks([{ type: 'heading1', text: '' }])).toBe('#');
  });
});

describe('왕복', () => {
  it('문서를 왕복시켜도 값이 변하지 않는다', () => {
    const document = [
      '# 제목1 입니다',
      '',
      '본문 **굵게** 그리고 *기울임*',
      '',
      '## 제목2',
      '> 인용문',
      '- 항목 하나',
      '- 항목 둘',
      '1. 첫째',
      '2. 둘째',
      '',
      '---',
      '',
      '마지막 줄',
    ].join('\n');

    expect(roundTrip(document)).toBe(document);
  });

  it('두 번 왕복해도 같다', () => {
    const document = '# 제목\n\n본문\n\n---\n\n- 항목';

    expect(roundTrip(roundTrip(document))).toBe(roundTrip(document));
  });

  it('글머리 별표는 표준 마커로 정규화된다', () => {
    expect(roundTrip('* 항목\n+ 항목')).toBe('- 항목\n- 항목');
  });

  it('숫자 리스트는 왕복하면서 번호가 정리된다', () => {
    expect(roundTrip('1. 가\n5. 나\n9. 다')).toBe('1. 가\n2. 나\n3. 다');
  });
});

describe('인라인 → HTML', () => {
  it('굵게 · 기울임 · 코드를 태그로 바꾼다', () => {
    expect(inlineToHtml('**굵게**')).toBe('<strong>굵게</strong>');
    expect(inlineToHtml('*기울임*')).toBe('<em>기울임</em>');
    expect(inlineToHtml('`코드`')).toBe('<code>코드</code>');
  });

  it('마커 바깥 텍스트는 그대로 둔다', () => {
    expect(inlineToHtml('안녕 **굵게** 하세요')).toBe(
      '안녕 <strong>굵게</strong> 하세요',
    );
  });

  it('굵게 안의 기울임도 처리한다', () => {
    expect(inlineToHtml('**굵게 *기울임* 끝**')).toBe(
      '<strong>굵게 <em>기울임</em> 끝</strong>',
    );
  });

  it('코드 스팬 안은 문자 그대로 둔다', () => {
    expect(inlineToHtml('`**굵지 않음**`')).toBe('<code>**굵지 않음**</code>');
  });

  it('HTML을 이스케이프해 주입을 막는다', () => {
    expect(inlineToHtml('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    );
    expect(inlineToHtml('**<b>x</b>**')).toBe(
      '<strong>&lt;b&gt;x&lt;/b&gt;</strong>',
    );
  });
});

describe('인라인 감싸기', () => {
  it('마커 안쪽 공백을 바깥으로 밀어낸다', () => {
    // Cmd+B를 누른 뒤 공백부터 입력하면 <strong>이 공백을 품는다.
    expect(wrapInline('**', ' 굵게')).toBe(' **굵게**');
    expect(wrapInline('*', ' 기울임 ')).toBe(' *기울임* ');
  });

  it('밀어낸 결과는 강조로 다시 파싱된다', () => {
    // 공백이 마커 안쪽에 남으면 CommonMark가 강조로 보지 않는다 (6.2).
    expect(inlineToHtml(wrapInline('**', ' 굵게'))).toBe(
      ' <strong>굵게</strong>',
    );
  });

  it('공백뿐이면 마커를 붙이지 않는다', () => {
    expect(wrapInline('**', '   ')).toBe('   ');
    expect(wrapInline('**', '')).toBe('');
  });

  it('코드 스팬은 공백도 내용이므로 그대로 둔다', () => {
    expect(wrapInline('`', ' code ')).toBe('` code `');
  });
});

describe('블록 → HTML', () => {
  it('블록마다 태그와 data-block을 붙인다', () => {
    expect(blocksToHtml([{ type: 'heading1', text: '제목' }])).toBe(
      '<h1 data-block="heading1">제목</h1>',
    );
    expect(blocksToHtml([{ type: 'quote', text: '인용' }])).toBe(
      '<blockquote data-block="quote">인용</blockquote>',
    );
  });

  it('구분선은 본문 없는 태그로 그린다', () => {
    expect(blocksToHtml([{ type: 'divider', text: '' }])).toBe(
      '<hr data-block="divider">',
    );
  });

  it('빈 블록에는 커서를 둘 수 있도록 <br>을 넣는다', () => {
    expect(blocksToHtml([{ type: 'paragraph', text: '' }])).toBe(
      '<p data-block="paragraph"><br></p>',
    );
  });
});

describe('입력 규칙', () => {
  it('요청한 여섯 문법이 전부 발동한다', () => {
    expect(matchInputRule('#')).toBe('heading1');
    expect(matchInputRule('##')).toBe('heading2');
    expect(matchInputRule('###')).toBe('heading3');
    expect(matchInputRule('>')).toBe('quote');
    expect(matchInputRule('-')).toBe('bullet');
    expect(matchInputRule('1.')).toBe('ordered');
  });

  it('별표 · 더하기 · 괄호 번호도 같이 받는다', () => {
    expect(matchInputRule('*')).toBe('bullet');
    expect(matchInputRule('+')).toBe('bullet');
    expect(matchInputRule('42)')).toBe('ordered');
  });

  it('구분선도 발동한다', () => {
    expect(matchInputRule('---')).toBe('divider');
  });

  it('마커가 아니면 발동하지 않는다', () => {
    expect(matchInputRule('')).toBeNull();
    expect(matchInputRule('####')).toBeNull();
    expect(matchInputRule('가')).toBeNull();
    expect(matchInputRule('#가')).toBeNull();
    expect(matchInputRule('1')).toBeNull();
  });
});

describe('블록 종류 규칙', () => {
  it('제목 다음 줄은 본문이 된다', () => {
    expect(getNextBlockType('heading1')).toBe('paragraph');
    expect(getNextBlockType('heading2')).toBe('paragraph');
    expect(getNextBlockType('divider')).toBe('paragraph');
  });

  it('목록과 인용문은 다음 줄에도 이어진다', () => {
    expect(getNextBlockType('bullet')).toBe('bullet');
    expect(getNextBlockType('ordered')).toBe('ordered');
    expect(getNextBlockType('quote')).toBe('quote');
    expect(getNextBlockType('paragraph')).toBe('paragraph');
  });

  it('블록 종류를 판별한다', () => {
    expect(isBlockType('heading1')).toBe(true);
    expect(isBlockType('nope')).toBe(false);
    expect(isBlockType(null)).toBe(false);
    expect(isBlockType('toString')).toBe(false);
  });
});
