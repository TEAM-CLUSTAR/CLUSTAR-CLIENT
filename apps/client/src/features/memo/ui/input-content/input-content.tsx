import { useMemo } from 'react';
import ReactQuill from 'react-quill-new';

import '../../libs/quill-register';

import { memoQuillFormats, memoQuillModules } from '../../libs/quill-config';

import * as styles from './input-content.css';

interface InputContnentProps {
  value: string;
  onChange: (value: string) => void;
}

const InputContent = ({ value, onChange }: InputContnentProps) => {
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
        onChange={onChange}
      />
    </section>
  );
};

export default InputContent;
