import { useMemo } from 'react';

import { blocksToHtml, parseMarkdown } from './markdown';

interface MarkdownViewerProps {
  value: string;
  className?: string;
}

export const MarkdownViewer = ({ value, className }: MarkdownViewerProps) => {
  const html = useMemo(() => blocksToHtml(parseMarkdown(value)), [value]);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
