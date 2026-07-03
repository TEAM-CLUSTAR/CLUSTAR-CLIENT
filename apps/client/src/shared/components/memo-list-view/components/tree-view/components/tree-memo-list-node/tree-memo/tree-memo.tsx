import { useState } from 'react';

import { LABEL_COLOR_BY_TEXT } from '@shared/constants/label-match';
import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

import DetailModal from '../detail-modal/detail-modal';
import { useDetailMemo } from './apis/queries';
import useSingleAndDoubleClick from './hooks/use-single-and-double-click';

import * as styles from './tree-memo.css';

interface TreeMemoProps {
  memo: StructureMemoTypes;
}

const TreeMemo = ({ memo }: TreeMemoProps) => {
  const { memoId, title, content, labelList } = memo;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달이 열릴 때만 API 호출
  const {
    data: memoDetail = {
      memoId: 0,
      title: '',
      content: '',
      images: [],
      files: [],
      labelList: [],
      createdAt: '',
      isAiGenerated: false,
      sourceMemoTitleList: [],
    },
  } = useDetailMemo({ memoId, enabled: isModalOpen });
  const labelName = labelList[0]?.name ?? '라벨없음';
  const labelColor = LABEL_COLOR_BY_TEXT[labelName as LabelTextType];

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const handleClick = useSingleAndDoubleClick({
    handleSingleClick: () => handleModalOpenChange(true),
    handleDoubleClick: () => handleModalOpenChange(true),
  });

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
          handleClick();
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
