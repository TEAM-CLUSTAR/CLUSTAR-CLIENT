import * as styles from './user-message-bubble.css';

interface UserMessageBubbleProps {
  content: string;
}

const UserMessageBubble = ({ content }: UserMessageBubbleProps) => {
  return (
    <div className={styles.bubbleBox}>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default UserMessageBubble;
