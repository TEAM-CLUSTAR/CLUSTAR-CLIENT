import ListPageLayout from '@layouts/list-page-layout/list-page-layout';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import emptyMemoImage from '@shared/assets/images/empty-state/empty-memo.svg';
import EmptyView from '@shared/components/empty-view/empty-view';
import Header from '@shared/components/header/header';

import * as styles from './trash-page.css';

const TrashPage = () => {
  return (
    <ListPageLayout
      header={
        <>
          <Header title="휴지통" count={0}>
            <Button
              size="sm"
              variant="ghost"
              icon={<Icon name="ic_trash" size={16} color="primary" />}
            >
              휴지통 비우기
            </Button>
          </Header>
          <div className={styles.notice}>
            <Icon name="ic_info" size={16} color="brand" />
            <p className={styles.noticeText}>
              휴지통의 메모는 30일이 지나면 영구 삭제돼요.
            </p>
          </div>
        </>
      }
    >
      <EmptyView
        imgSrc={emptyMemoImage}
        title="휴지통이 비어 있어요."
        description="지운 메모는 여기에 30일 동안 보관돼요."
      />
    </ListPageLayout>
  );
};

export default TrashPage;
