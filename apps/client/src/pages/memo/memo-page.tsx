import { PATH } from '@router/path';
import { useNavigate, useSearchParams } from 'react-router';

import EmptyView from '@shared/components/empty-view/empty-view';

import { useGetAllMemo, useGetMemoTotalCount } from './apis/queries';
import MemoList from './components/memo-list/memo-list';

import * as styles from './memo-page.css';

import emptyImage from '/empty.svg';

const AllMemoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');
  const tagId = tagParam !== null ? [Number(tagParam)] : undefined;

  const {
    data: filteredMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo(tagId);

  const { data: totalCount } = useGetMemoTotalCount(tagId);

  return (
    <>
      {/* MemoHeader 컴포넌트 */}

      <div className={styles.container}>
        {totalCount === 0 ? (
          <EmptyView
            imgSrc={emptyImage}
            title="작성된 메모가 없습니다."
            description="새 메모 창에 들어가서 새로운 메모를 생성해보세요."
            buttonText="메모 작성하러 가기"
            onButtonClick={() => navigate(PATH.NEW_MEMO)}
          />
        ) : (
          <>
            {/* 카드 선택/드래그, 상세 페이지 연결 전까지 임시 값 전달 */}
            <MemoList
              cards={filteredMemos ?? []}
              isSelected={false}
              isDragging={false}
              onClickCard={() => {}}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AllMemoPage;
