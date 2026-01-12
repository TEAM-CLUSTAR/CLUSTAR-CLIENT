import HoverLabelToken from '../hover-label-token/hover-label-token';

import * as styles from './hover-nav-items.css';

// api에서 내려주는 라벨의 키값으로 변경 필요
interface LabelTypes {
  name: string;
  id: number;
}

export type LabelModeProps = {
  isLabel: true;
  contents: Array<LabelTypes>;
};

export type MenuModeProps = {
  isLabel: false;
  contents: string;
};

type HoverNavItemsProps = LabelModeProps | MenuModeProps;

const HoverNavItems = ({ isLabel, contents }: HoverNavItemsProps) => {
  return (
    <>
      {isLabel ? (
        <div className={`${styles.commonContainer} ${styles.labelContainer}`}>
          {contents.map((content) => (
            <HoverLabelToken key={content.id}>{content.name}</HoverLabelToken>
          ))}
        </div>
      ) : (
        <div className={`${styles.commonContainer} ${styles.menuContainer}`}>
          {contents}
        </div>
      )}
    </>
  );
};

export default HoverNavItems;
