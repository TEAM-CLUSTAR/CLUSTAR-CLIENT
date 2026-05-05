import { useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './user-message-bubble.css';

interface UserMessageBubbleProps {
  content: string;
}

const UserMessageBubble = ({ content }: UserMessageBubbleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setIsShowMore(scrollHeight > clientHeight);
    }
  }, [content]);

  return (
    <div className={styles.bubbleBox}>
      <p
        ref={contentRef}
        className={`${!isExpanded ? styles.collapsed : styles.fullText}`}
      >
        {content}
      </p>

      {isShowMore && (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? (
            <>
              간략히 보기 <Icon name="ic_chevron_up" width={20} height={20} />
            </>
          ) : (
            <>
              전체보기 <Icon name="ic_chevron_down" width={20} height={20} />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default UserMessageBubble;
