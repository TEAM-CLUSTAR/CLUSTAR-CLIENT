import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

/**
 * Quill HTML -> Markdown
 * - Quill에서 나오는 HTML은 기본적으로 <p>, <h1~>, <strong>, <u>, <blockquote>, <ul><li>..., <br> 등을 포함
 * - &nbsp; / 빈 문단(<p><br></p>) / 연속 공백 등을 정리
 */
type HtmlToMarkdownOptions = {
  emptyValue?: string;
  normalizeNewlines?: boolean;
};

let cachedTurndown: TurndownService | null = null;

const getTurndown = () => {
  if (cachedTurndown) return cachedTurndown;

  const service = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
    strongDelimiter: '**',
  });

  service.use(gfm);

  /** <u> → __text__ */
  service.addRule('underline', {
    filter: ['u'],
    replacement(content) {
      return content ? `__${content}__` : '';
    },
  });

  /** <br> → \n */
  service.addRule('lineBreak', {
    filter: ['br'],
    replacement: () => '\n',
  });

  /** 빈 문단 정리 */
  service.addRule('emptyParagraph', {
    filter(node) {
      if (node.nodeName !== 'P') return false;
      const el = node as HTMLElement;
      const html = el.innerHTML?.trim().toLowerCase();
      return html === '<br>' || html === '&nbsp;' || html === '';
    },
    replacement() {
      return '\n\n';
    },
  });

  /** 이미지 */
  service.addRule('image', {
    filter: (node) => node.nodeName === 'IMG',
    replacement: (_content, node) => {
      const img = node as HTMLImageElement;
      const src = img.getAttribute('src') ?? '';
      if (!src) return '';
      const alt = img.getAttribute('alt') ?? '';
      const safeAlt = alt.replace(/\[/g, '(').replace(/\]/g, ')');
      return `![${safeAlt}](${src})`;
    },
  });

  cachedTurndown = service;
  return service;
};

const normalizeQuillHtml = (html: string) => {
  let out = html.replace(/&nbsp;/g, ' ');
  out = out.replace(/\r\n/g, '\n');
  return out;
};

const normalizeMarkdown = (md: string) => {
  let out = md;
  out = out.replace(/[ \t]+\n/g, '\n');
  out = out.replace(/\n{3,}/g, '\n\n');
  out = out.trim();

  return out;
};

export const htmlToMarkdown = (
  html: string,
  options: HtmlToMarkdownOptions = {},
) => {
  const { emptyValue = '', normalizeNewlines = true } = options;

  const normalizedHtml = normalizeQuillHtml(html);
  const trimmed = normalizedHtml.trim();

  const isEmptyLike =
    !trimmed || trimmed === '<p><br></p>' || trimmed === '<p></p>';

  if (isEmptyLike) return emptyValue;

  const turndown = getTurndown();
  const wrapped = `<div>${normalizedHtml}</div>`;
  const md = turndown.turndown(wrapped);

  return normalizeNewlines ? normalizeMarkdown(md) : md.trim();
};
