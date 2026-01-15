declare module 'quill-markdown-shortcuts' {
  const MarkdownShortcuts;
  export default MarkdownShortcuts;
}

declare module 'turndown-plugin-gfm' {
  import type TurndownService from 'turndown';

  type Plugin = (service: TurndownService) => void;

  export const gfm: Plugin;
  export const gfmFlavors: Plugin;
}
