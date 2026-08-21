import { useState } from 'react';

import { NO_TAG_COLOR, TAG_COLOR_MATCH, type TagColorType } from '@cds/ui';

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
  const { textColor } =
    TAG_COLOR_MATCH[tagList[0]?.color as TagColorType] ?? NO_TAG_COLOR;

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
        className={styles.container}
        style={{ borderLeft: `3.5px solid ${textColor}` }}
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
