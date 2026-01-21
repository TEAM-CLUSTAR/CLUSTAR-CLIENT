import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

export const groupByLabelName = (memos: StructureMemoTypes[]) => {
  return memos.reduce<Record<string, StructureMemoTypes[]>>((acc, memo) => {
    if (!memo.labelList || memo.labelList.length === 0) {
      // labelList가 없거나 빈 배열일 때는 '라벨없음'으로 그룹화
      if (!acc['라벨없음']) {
        acc['라벨없음'] = [];
      }
      acc['라벨없음'].push(memo);
    } else {
      memo.labelList.forEach((label) => {
        if (!acc[label.name]) {
          acc[label.name] = [];
        }
        acc[label.name].push(memo);
      });
    }
    return acc;
  }, {});
};

interface NodeEdgeTypes {
  labelName: LabelTextType;
  memos: StructureMemoTypes[];
}

export const convertGroupToNodeEdgeData = (
  grouped: Record<string, StructureMemoTypes[]>,
): NodeEdgeTypes[] => {
  return Object.entries(grouped).map(([labelName, memos]) => ({
    labelName: labelName as LabelTextType,
    memos,
  }));
};
