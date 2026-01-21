import { useMemo } from 'react';
import ReactQuill from 'react-quill-new';

import '../../libs/quill-register';

import { memoQuillFormats, memoQuillModules } from '../../libs/quill-config';

import * as styles from './input-content.css';

interface InputContnentProps {
  value: string;
  onChange: (value: string) => void;
}

const isEmptyContent = (html: string): boolean => {
  if (!html || html.trim() === '') return true;

  const withoutTags = html.replace(/<[^>]*>/g, '');
  const textContent = withoutTags.replace(/&nbsp;/g, ' ').trim();

  return textContent.length === 0;
};

const InputContent = ({ value, onChange }: InputContnentProps) => {
  const modules = useMemo(() => memoQuillModules, []);
  const formats = useMemo(() => [...memoQuillFormats], []);

  const handleChange = (html: string) => {
    if (isEmptyContent(html)) {
      onChange('');
      return;
    }
    onChange(html);
  };

  return (
    <section data-quill-scope>
      <ReactQuill
        className={styles.editor}
        placeholder="정리하고 싶은 내용을 메모하세요."
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
      />
    </section>
  );
};

export default InputContent;
