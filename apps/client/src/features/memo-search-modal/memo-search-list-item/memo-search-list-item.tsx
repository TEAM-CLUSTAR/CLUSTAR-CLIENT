import { Icon } from '@cds/icon';
import { Tag, themeVars } from '@cds/ui';

import { TAG_COLOR_MATCH } from '@shared/constants/tag-color-match';
import { TagDisplayInfo } from '@shared/types/tag';
import { formatTodayTimeOrDate } from '@shared/utils/format-date';

import * as styles from './memo-search-list-item.css';

const MAX_TAG_COUNT = 4;

interface MemoSearchListItemProps {
  memoId: number;
  title: string;
  content: string;
  openedAt: string;
  tags?: TagDisplayInfo[];
  onClickMemo: (memoId: number) => void;
}

const MemoSearchListItem = ({
  memoId,
  title,
  content,
  openedAt,
  tags = [],
  onClickMemo,
}: MemoSearchListItemProps) => {
  const visibleTags = tags.slice(0, MAX_TAG_COUNT);

  const handleClickMemo = () => {
    // TODO: 메모 상세 페이지 URL이 추가되면 Link으로 변경 예정
    onClickMemo(memoId);
  };

  return (
    <article className={styles.container}>
      <button
        type="button"
        className={styles.clickTarget}
        onClick={handleClickMemo}
        aria-label={`${title} 메모 상세 보기`}
      />
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
            {visibleTags.map((tag) => {
              const colorStyle = TAG_COLOR_MATCH[tag.color];

              return (
                <Tag
                  key={tag.tagId}
                  size="sm"
                  backgroundColor={
                    colorStyle?.backgroundColor ?? themeVars.color.grey100
                  }
                  textColor={colorStyle?.textColor ?? themeVars.color.grey600}
                  text={tag.name}
                />
              );
            })}
          </div>
        </div>
        <time className={styles.openedAt} dateTime={openedAt}>
          {formatTodayTimeOrDate(openedAt)}
        </time>
      </div>
      <p className={styles.content}>{content}</p>
    </article>
  );
};

export default MemoSearchListItem;
