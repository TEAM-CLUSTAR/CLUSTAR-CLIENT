import { createContext, useContext } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import type { MarkdownCommand } from './markdown';
import type {
  MarkdownEditorApi,
  MarkdownEditorOptions,
} from './use-markdown-editor';
import { useMarkdownEditor } from './use-markdown-editor';

import * as styles from './markdown-editor.css';

const MarkdownEditorContext = createContext<MarkdownEditorApi | null>(null);

const useMarkdownEditorContext = (component: string): MarkdownEditorApi => {
  const context = useContext(MarkdownEditorContext);
  if (context === null) {
    throw new Error(
      `<MarkdownEditor.${component}>는 <MarkdownEditor> 안에서만 사용할 수 있습니다.`,
    );
  }

  return context;
};

type RootProps = MarkdownEditorOptions & { children?: ReactNode };

const Root = ({ children, ...options }: RootProps) => {
  const api = useMarkdownEditor(options);

  return (
    <MarkdownEditorContext.Provider value={api}>
      {children}
    </MarkdownEditorContext.Provider>
  );
};

type ToolbarProps = {
  className?: string;
  children?: ReactNode | ((command: MarkdownCommand) => ReactNode);
};

const Toolbar = ({ className, children }: ToolbarProps) => {
  const { commands } = useMarkdownEditorContext('Toolbar');
  const content =
    typeof children === 'function'
      ? commands.map((command) => children(command))
      : children;

  return (
    <div role="toolbar" className={className}>
      {content}
    </div>
  );
};

type ButtonProps = {
  command: MarkdownCommand;
  className?: string;
  children?: ReactNode;
  onSelect?: (command: MarkdownCommand) => void;
};

const Button = ({ command, className, children, onSelect }: ButtonProps) => {
  const { activeType, setBlockType } = useMarkdownEditorContext('Button');

  const preserveCaret = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const selectCommand = () => {
    setBlockType(command.id);
    onSelect?.(command);
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={command.label}
      aria-pressed={activeType === command.id}
      onMouseDown={preserveCaret}
      onClick={selectCommand}
    >
      {children ?? command.label}
    </button>
  );
};

type InputProps = {
  className?: string;
  placeholder?: string;
};

const Input = ({ className, placeholder }: InputProps) => {
  const { getInputProps } = useMarkdownEditorContext('Input');

  return (
    <div
      {...getInputProps()}
      className={[styles.container, className].filter(Boolean).join(' ')}
      data-placeholder={placeholder}
    />
  );
};

export const MarkdownEditor = Object.assign(Root, { Toolbar, Button, Input });
