import { useEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './user-message-bubble.css';

interface UserMessageBubbleProps {
  content: string;
}

const UserMessageBubble = ({ content }: UserMessageBubbleProps) => {
  const [showToggle, setShowToggle] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const textEl = contentRef.current;
    if (!textEl) return;

    setShowToggle(textEl.scrollHeight > textEl.clientHeight);
    setIsExpanded(false);
  }, [content]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.bubbleBox}>
      <p ref={contentRef} className={styles.textContent({ isExpanded })}>
        {content}
      </p>

      {showToggle && (
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '간략히 보기' : '전체보기'}
          <Icon
            name={isExpanded ? 'ic_chevron_up' : 'ic_chevron_down'}
            color="grey500"
            size={20}
          />
        </button>
      )}
    </div>
  );
};

export default UserMessageBubble;
