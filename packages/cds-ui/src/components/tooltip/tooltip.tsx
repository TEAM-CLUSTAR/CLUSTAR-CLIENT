import { ReactNode } from 'react';

import * as styles from './tooltip.css';

interface TooltipProps {
  children: ReactNode;
}
const Tooltip = ({ children }: TooltipProps) => {
  return <div className={styles.container}>{children}</div>;
};
export default Tooltip;
