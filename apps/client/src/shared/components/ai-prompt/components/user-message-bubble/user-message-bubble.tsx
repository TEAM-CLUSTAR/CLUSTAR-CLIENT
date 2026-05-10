import { useLayoutEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './user-message-bubble.css';

interface UserMessageBubbleProps {
  content: string;
}

const UserMessageBubble = ({ content }: UserMessageBubbleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const textEl = contentRef.current;
    if (!textEl) return;

    const hasOverflow = textEl.scrollHeight > textEl.clientHeight;
    setIsExpanded(false);
    setIsShowMore(hasOverflow);
    setShowEllipsis(hasOverflow);
  }, [content]);

  const handleTransitionEnd = () => {
    if (!isExpanded) {
      setShowEllipsis(true);
    }
  };

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setShowEllipsis(false);
      setIsExpanded(true);
    }
  };

  const expandedStyle =
    isExpanded && contentRef.current
      ? { maxHeight: `${contentRef.current.scrollHeight}px` }
      : undefined;

  return (
    <div className={styles.bubbleBox}>
      <p
        ref={contentRef}
        onTransitionEnd={handleTransitionEnd}
        className={styles.textContent({ clamped: showEllipsis })}
        style={expandedStyle}
      >
        {content}
      </p>

      {isShowMore && (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '간략히 보기' : '전체보기'}
          <Icon
            name={isExpanded ? 'ic_chevron_up' : 'ic_chevron_down'}
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

export default UserMessageBubble;
