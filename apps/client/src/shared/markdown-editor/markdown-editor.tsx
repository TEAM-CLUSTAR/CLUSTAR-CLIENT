/**
 * 합성 컴포넌트. 편집 동작은 useMarkdownEditor가 하고 여기서는 조립만 한다.
 */
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
  /** 함수를 주면 지원하는 블록 문법마다 한 번씩 호출한다. */
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
  /** 블록을 바꾸는 일은 버튼이 하고, 그 다음 할 일은 쓰는 쪽이 정한다. */
  onSelect?: (command: MarkdownCommand) => void;
};

const Button = ({ command, className, children, onSelect }: ButtonProps) => {
  const { activeType, setBlockType } = useMarkdownEditorContext('Button');

  const preserveCaret = (event: MouseEvent<HTMLButtonElement>) => {
    // 이걸 빼면 포커스가 편집 영역 밖으로 나가 커서 위치가 날아간다.
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
  /** 편집 영역의 크기·테두리처럼 바깥 상자에 해당하는 스타일. */
  className?: string;
  /** 내용이 비었을 때 보여줄 안내 문구 */
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
