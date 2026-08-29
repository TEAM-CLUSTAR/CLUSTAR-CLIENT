import MemoEditor from '@shared/components/memo-editor/memo-editor';

interface MemoDetailProps {
  memoId: number;
  /** 메모 삭제 성공 시 호출돼요. 상위(탭)에서 닫기 등 후처리를 담당해요. */
  onDeleted: () => void;
}

const MemoDetail = ({ memoId, onDeleted }: MemoDetailProps) => {
  return <MemoEditor key={memoId} memoId={memoId} onDeleted={onDeleted} />;
};

export default MemoDetail;
