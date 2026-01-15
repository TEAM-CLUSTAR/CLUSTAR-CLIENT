import { Icon } from '@cds/icon';

import { PromptOptionType } from './prompt-option';
import PromptPopover from './prompt-popover';

import * as styles from './prompt-option.css';

interface PromptOptionItemProps {
  option: PromptOptionType;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

const PromptOptionItem = ({
  option,
  selected,
  hovered,
  onSelect,
  onHover,
  onLeave,
}: PromptOptionItemProps) => {
  const isActive = selected || hovered;

  return (
    <div className={styles.optionWrapper}>
      <button
        type="button"
        className={styles.optionItem({ active: selected })}
        onClick={onSelect}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        aria-pressed={selected}
        aria-label={option.title}
      >
        <Icon
          name={isActive ? option.iconOn : option.iconOff}
          width={36}
          height={36}
        />
      </button>

      {hovered && (
        <div className={styles.popoverWrapper}>
          <PromptPopover
            title={option.title}
            description={option.description}
          />
        </div>
      )}
    </div>
  );
};

export default PromptOptionItem;
