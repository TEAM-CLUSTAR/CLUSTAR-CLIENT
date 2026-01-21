import { Icon } from '@cds/icon';

import * as styles from './sidebar-profile.css';

interface SidebarProfileProps {
  name?: string;
  email?: string;
  profileImageUrl?: string;
}

const SidebarProfile = ({
  name,
  email,
  profileImageUrl,
}: SidebarProfileProps) => {
  const hasProfileImage = !!profileImageUrl;

  return (
    <div
      className={styles.sidebarProfileContainer({
        hasProfileImage,
      })}
    >
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="프로필 이미지"
          className={styles.profileImage}
        />
      ) : (
        <Icon name="ic_profile" width={36} height={36} />
      )}
      <div className={styles.userInfoTextContainer}>
        {name && <span className={styles.userId}>{name}</span>}
        {email && <span className={styles.userEmail}>{email}</span>}
      </div>
    </div>
  );
};

export default SidebarProfile;
