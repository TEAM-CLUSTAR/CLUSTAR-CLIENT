import { useMemo } from 'react';

import { Icon } from '@cds/icon';

import Title from '../title/title';

import * as styles from './text-content.css';

export interface TextContentProps {
  isAiResult: boolean;
  mode: 'detail' | 'prompt';
  title: string;
  content: string;
}

// 마크다운을 HTML로 변환하는 함수
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  let html = markdown;

  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (_match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre><code>${code}</code></pre>`);
    return placeholder;
  });

  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (_match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(`<code>${code}</code>`);
    return placeholder;
  });

  // 헤더 변환
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 볼드 (**text**)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // 이탤릭 (*text*) - 볼드가 아닌 경우만
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>');

  // 밑줄 (__text__)
  html = html.replace(/__(.+?)__/g, '<u>$1</u>');

  // 인용구
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // 순서 없는 리스트
  const lines = html.split('\n');
  let inUlList = false;
  let result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      result.push('');
      continue;
    }
    const ulMatch = line.match(/^[-*] (.+)$/);

    if (ulMatch && ulMatch[1]) {
      if (!inUlList) {
        result.push('<ul>');
        inUlList = true;
      }
      result.push(`<li>${ulMatch[1]}</li>`);
    } else {
      if (inUlList) {
        result.push('</ul>');
        inUlList = false;
      }
      result.push(line);
    }
  }

  if (inUlList) {
    result.push('</ul>');
  }

  html = result.join('\n');

  // 순서 있는 리스트
  inUlList = false;
  result = [];
  const olLines = html.split('\n');

  for (let i = 0; i < olLines.length; i++) {
    const line = olLines[i];
    if (!line) {
      result.push('');
      continue;
    }
    const olMatch = line.match(/^\d+\. (.+)$/);

    if (
      olMatch &&
      olMatch[1] &&
      typeof olMatch[1] === 'string' &&
      !line.includes('<li>')
    ) {
      if (!inUlList) {
        result.push('<ol>');
        inUlList = true;
      }
      result.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUlList) {
        result.push('</ol>');
        inUlList = false;
      }
      result.push(line);
    }
  }

  if (inUlList) {
    result.push('</ol>');
  }

  html = result.join('\n');

  // 링크
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  // 이미지
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // 수평선
  html = html.replace(/^---$/gim, '<hr />');

  // 코드 블록과 인라인 코드 복원
  codeBlocks.forEach((code, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, code);
  });
  inlineCodes.forEach((code, index) => {
    html = html.replace(`__INLINE_CODE_${index}__`, code);
  });

  // 줄바꿈 처리
  const paragraphs = html.split('\n\n');
  html = paragraphs
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<p>')
      ) {
        return trimmed;
      }
      const withBreaks = trimmed.replace(/\n/g, '<br />');
      return `<p>${withBreaks}</p>`;
    })
    .filter((p) => p)
    .join('');

  return html;
};

const TextContent = ({
  isAiResult,
  mode,
  title,
  content,
}: TextContentProps) => {
  const htmlContent = useMemo(() => markdownToHtml(content), [content]);

  return (
    <article className={styles.container({ type: mode })}>
      {isAiResult ? (
        <div className={styles.headerContainer}>
          <Icon
            name="ic_ai_blue_40"
            width={40}
            height={40}
            className={styles.icon}
          />
          <div className={styles.titleWrapper}>
            <p className={styles.aiSummary}>AI 결과</p>
            <Title title={title} />
          </div>
        </div>
      ) : (
        <Title title={title} />
      )}

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default TextContent;
