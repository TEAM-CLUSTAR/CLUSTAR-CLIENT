import { MarkdownEditor } from '@shared/markdown-editor';

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
  return (
    <section>
      <MarkdownEditor value={value} onChange={onChange}>
        <MarkdownEditor.Input
          className={styles.editor}
          placeholder={PLACEHOLDER_TEXT}
        />
      </MarkdownEditor>
    </section>
  );
};

export default InputContent;
