import { LabelTextType } from '@shared/types/label-type';
import { StructureMemoTypes } from '@shared/types/memo-info-type';

export const groupByLabelName = (memos: StructureMemoTypes[]) => {
  return memos.reduce<Record<string, StructureMemoTypes[]>>((acc, memo) => {
    memo.labelList.forEach((label) => {
      if (!acc[label.name]) {
        acc[label.name] = [];
      }
      acc[label.name].push(memo);
    });
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
