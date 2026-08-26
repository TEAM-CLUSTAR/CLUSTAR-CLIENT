import { ReactNode } from 'react';

import Tooltip from '../tooltip/tooltip';

import * as styles from './hover-tooltip.css';

interface HoverTooltipProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const HoverTooltip = ({ title, description, children }: HoverTooltipProps) => {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.tooltip}>
        <Tooltip title={title} description={description} />
      </div>
    </div>
  );
};

export default HoverTooltip;
