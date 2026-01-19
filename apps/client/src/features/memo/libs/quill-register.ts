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

const BlockEmbedClass = Quill.import(
  'blots/block/embed',
) as BlockEmbedConstructor;

class DividerBlot extends BlockEmbedClass {
  static blotName = 'divider';
  static tagName = 'hr';
}

Quill.register(DividerBlot, true);
Quill.register('modules/markdownShortcuts', MarkdownShortcuts, true);
