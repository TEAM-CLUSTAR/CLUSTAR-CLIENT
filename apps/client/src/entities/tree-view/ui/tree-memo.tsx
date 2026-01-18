import { DetailModal } from '@cds/ui';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { MemoInfoTypes } from '@shared/types/memo-info-type';

import * as styles from './tree-memo.css';

interface TreeMemoProps extends MemoInfoTypes {
  labelName: LabelTextType;
}

const TreeMemo = ({
  labelName,
  labelList,
  images,
  textContent,
  files,
  selectedMemos,
}: TreeMemoProps) => {
  const labelColor = LABEL_COLOR_BY_TEXT[labelName];
  const { title, content } = textContent;

  return (
    <DetailModal
      labelList={labelList}
      images={images}
      textContent={textContent}
      files={files}
      selectedMemos={selectedMemos}
    >
      <button type="button" className={styles.container({ labelColor })}>
        <span className={styles.title}>{title}</span>
        <span className={styles.content}>{content}</span>
      </button>
    </DetailModal>
  );
};

export default TreeMemo;
