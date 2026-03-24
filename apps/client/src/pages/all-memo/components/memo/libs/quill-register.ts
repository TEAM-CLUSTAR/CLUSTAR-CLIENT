// libs/quill-register.ts
import MarkdownShortcuts from 'quill-markdown-shortcuts';
import { Quill } from 'react-quill-new';

interface BlockEmbedInstance {
  domNode: HTMLElement;
  value(): unknown;
}

interface BlockEmbedConstructor {
  new (...args: readonly unknown[]): BlockEmbedInstance;
  blotName: string;
  tagName: string;
}

const INIT_KEY = '__clustar_quill_register_v1__';

const ensureQuillRegistered = () => {
  // ✅ HMR/중복 번들에서도 1회만 보장
  const g = globalThis as unknown as Record<string, unknown>;
  if (g[INIT_KEY]) return;

  const BlockEmbedClass = Quill.import(
    'blots/block/embed',
  ) as BlockEmbedConstructor;

  class DividerBlot extends BlockEmbedClass {
    static blotName = 'divider';
    static tagName = 'hr';
  }

  // ✅ 등록
  Quill.register(DividerBlot, true);
  Quill.register('modules/markdownShortcuts', MarkdownShortcuts, true);

  g[INIT_KEY] = true;
};

// ✅ 모듈 로드 시점에 즉시 등록 (ReactQuill 렌더링 전에 실행됨)
ensureQuillRegistered();

export { ensureQuillRegistered };
