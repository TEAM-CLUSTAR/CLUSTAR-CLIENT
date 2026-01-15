import { useMemo, useState } from 'react';
import MarkdownShortcuts from 'quill-markdown-shortcuts';
import ReactQuill, { Quill } from 'react-quill-new';

import { memoQuillFormats, memoQuillModules } from '../../libs/quill-config';

import * as styles from './input-content.css';

Quill.register('modules/markdownShortcuts', MarkdownShortcuts, true);

const InputContent = () => {
  const [value, setValue] = useState('');

  const handleChange = (content: string) => {
    setValue(content);
  };

  const modules = useMemo(() => memoQuillModules, []);
  const formats = useMemo(() => [...memoQuillFormats], []);

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
