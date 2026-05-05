import { ReactNode } from 'react';

import * as styles from './tooltip.css';

interface TooltipProps {
  children: ReactNode;
  className?: string;
}
const Tooltip = ({ children, className }: TooltipProps) => {
  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};
export default Tooltip;
