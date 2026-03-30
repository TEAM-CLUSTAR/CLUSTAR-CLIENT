import type { Range } from 'quill';
import type QuillType from 'react-quill-new';

interface KeyboardThis {
  quill: QuillType;
}

export const memoQuillModules = {
  toolbar: false,
  markdownShortcuts: {},
  keyboard: {
    bindings: {
      dividerOnSpace: {
        key: 32,
        handler(this: KeyboardThis, range: Range) {
          const quill = this.quill;

          const [, offset] = quill.getLine(range.index);
          const lineStartIndex = range.index - offset;

          const beforeCursor = quill
            .getText(lineStartIndex, offset)
            .replace(/\u200B/g, '');

          if (
            beforeCursor === '---' ||
            beforeCursor === '-' ||
            beforeCursor === '--'
          ) {
            quill.deleteText(lineStartIndex, 3, 'user');
            quill.insertEmbed(lineStartIndex, 'divider', true, 'user');
            quill.insertText(lineStartIndex + 1, '\n', 'user');
            quill.setSelection(lineStartIndex + 2, 0, 'user');
            return false;
          }

          return true;
        },
      },
    },
  },
};

export const memoQuillFormats = [
  'header',
  'bold',
  'underline',
  'list',
  'blockquote',
  'divider',
];
