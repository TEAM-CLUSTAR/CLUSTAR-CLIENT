import { useState } from 'react';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import DetailModal from '../detail-modal/detail-modal';
import { SelectedMemoTypes, useDetailMemo } from './apis/queries';

import * as styles from './tree-memo.css';

interface TreeMemoProps {
  memo: StructureMemoTypes;
}

const DEFAULT_MEMO_DETAIL: SelectedMemoTypes = {
  memoId: 0,
  title: '',
  content: '',
  images: [],
  files: [],
  tagList: [],
  createdAt: '',
  isAiGenerated: false,
  sourceMemoTitleList: [],
};

const TreeMemo = ({ memo }: TreeMemoProps) => {
  const { memoId, title, content, tagList } = memo;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: memoDetail = DEFAULT_MEMO_DETAIL } = useDetailMemo({
    memoId,
    enabled: isModalOpen,
  });
  const labelName = tagList[0]?.name ?? '라벨없음';
  const labelColor = LABEL_COLOR_BY_TEXT[labelName as LabelTextType];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <DetailModal
      open={isModalOpen}
      onOpenChange={handleModalOpenChange}
      id={memoId}
      data={memoDetail}
    >
      <button
        type="button"
        className={styles.container({ labelColor })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleModalOpenChange(true);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.content}>{content}</span>
      </button>
    </DetailModal>
  );
};

export default TreeMemo;
