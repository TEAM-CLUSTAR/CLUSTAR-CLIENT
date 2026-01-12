import { Icon } from '@cds/icon';

import * as styles from './sidebar-profile.css';

interface SidebarProfileProps {
  userId: string;
  userEmail: string;
}

const SidebarProfile = ({ userId, userEmail }: SidebarProfileProps) => {
  return (
    <div className={styles.sidebarProfileContainer}>
      <Icon name="ic_profile" width={36} height={36} />
      <div className={styles.userInfoTextContainer}>
        <span className={styles.userId}>{userId}</span>
        <span className={styles.userEmail}>{userEmail}</span>
      </div>
    </div>
  );
};

export default SidebarProfile;
