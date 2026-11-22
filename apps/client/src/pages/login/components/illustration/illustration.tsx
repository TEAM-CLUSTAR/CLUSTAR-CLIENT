import type { ReactNode } from 'react';

import * as styles from './illustration.css';

interface IllustrationLayer {
  src: string;
  className: string;
}

const BACK_LAYERS: IllustrationLayer[] = [
  { src: '/login/connector-l.svg', className: styles.connectorL },
  { src: '/login/connector-r.svg', className: styles.connectorR },
  { src: '/login/memo-l.svg', className: styles.memoL },
  { src: '/login/memo-r.svg', className: styles.memoR },
  { src: '/login/folder-back.svg', className: styles.folderBack },
];

const FRONT_LAYERS: IllustrationLayer[] = [
  { src: '/login/port.svg', className: styles.portMemoL },
  { src: '/login/port.svg', className: styles.portCard },
  { src: '/login/port.svg', className: styles.portMemoR },
  { src: '/login/spark-lg.svg', className: styles.sparkLg },
  { src: '/login/spark-sm.svg', className: styles.sparkSm },
  { src: '/login/folder-front.svg', className: styles.folderFront },
  { src: '/login/folder-lines.svg', className: styles.folderLines },
];

const renderLayers = (layers: IllustrationLayer[]) =>
  layers.map(({ src, className }) => (
    <img key={className} src={src} alt="" aria-hidden className={className} />
  ));

interface IllustrationProps {
  children: ReactNode;
}

const Illustration = ({ children }: IllustrationProps) => {
  return (
    <div className={styles.stage}>
      {renderLayers(BACK_LAYERS)}
      <div className={styles.cardSlot}>{children}</div>
      {renderLayers(FRONT_LAYERS)}
    </div>
  );
};

export default Illustration;
