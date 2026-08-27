import { Icon } from '@cds/icon';
import { Tag } from '@cds/ui';

import { formatTodayTimeOrDate } from '@shared/utils/format-date';

import { MemoSearchItemData } from '../../types';

import * as styles from './memo-search-list-item.css';

const MAX_TAG_COUNT = 4;

interface MemoSearchListItemProps {
  memo: MemoSearchItemData;
  onClickMemo: (memoId: number) => void;
}

const MemoSearchListItem = ({ memo, onClickMemo }: MemoSearchListItemProps) => {
  const { memoId, title, content, openedAt, tags = [] } = memo;
  const visibleTags = tags.slice(0, MAX_TAG_COUNT);

  const handleClickMemo = () => {
    // TODO: 메모 상세 페이지 URL이 추가되면 Link으로 변경 예정
    onClickMemo(memoId);
  };

  return (
    <article>
      <button
        type="button"
        className={styles.container}
        onClick={handleClickMemo}
      >
        <div className={styles.header}>
          <div className={styles.mainInfo}>
            <div className={styles.titleGroup}>
              <Icon
                name="ic_memo"
                size={24}
                color="grey700"
                className={styles.memoIcon}
              />
              <strong className={styles.title}>{title}</strong>
            </div>
            <div className={styles.tagList}>
              {visibleTags.map((tag) => (
                <Tag
                  key={tag.tagId}
                  size="sm"
                  color={tag.color}
                  text={tag.name}
                />
              ))}
            </div>
          </div>
          <time className={styles.openedAt} dateTime={openedAt}>
            {formatTodayTimeOrDate(openedAt)}
          </time>
        </div>
        <p className={styles.content}>{content}</p>
      </button>
    </article>
  );
};

export default MemoSearchListItem;
