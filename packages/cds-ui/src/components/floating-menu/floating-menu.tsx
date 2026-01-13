import * as styles from './floating-menu.css';

interface FloatingMenuProps {
  menuName: string;
}

const FloatingMenu = ({ menuName }: FloatingMenuProps) => {
  return <div className={styles.container}>{menuName}</div>;
};

export default FloatingMenu;
