import { useMemo } from 'react';
import ReactQuill from 'react-quill-new';

import '../../libs/quill-register';

import { memoQuillFormats, memoQuillModules } from '../../libs/quill-config';

import * as styles from './input-content.css';

interface InputContnentProps {
  value: string;
  onChange: (value: string) => void;
}

const PLACEHOLDER_TEXT = `# 가장 큰 글씨
## 두번째로 큰 글씨
### 세번째로 큰 글씨
--- 구분선
> 인용문
1. 숫자 리스트`;

const InputContent = ({ value, onChange }: InputContnentProps) => {
  const modules = useMemo(() => memoQuillModules, []);
  const formats = useMemo(() => [...memoQuillFormats], []);

  return (
    <section data-quill-scope>
      <ReactQuill
        className={styles.editor}
        placeholder={PLACEHOLDER_TEXT}
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
      />
    </section>
  );
};

export default InputContent;
