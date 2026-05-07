import { Icon } from '@cds/icon';

import { PromptOptionType } from './prompt-option';
import PromptPopover from './prompt-popover';

import * as styles from './prompt-option.css';

interface PromptOptionItemProps {
  option: PromptOptionType;
  selected: boolean;
  hovered: boolean;
  handleSelect: () => void;
  handleHover: () => void;
  handleLeave: () => void;
  disabled?: boolean;
}

const PromptOptionItem = ({
  option,
  selected,
  hovered,
  handleSelect,
  handleHover,
  handleLeave,
  disabled = false,
}: PromptOptionItemProps) => {
  return (
    <div className={styles.optionContainer}>
      <button
        type="button"
        className={styles.optionItem({ active: selected })}
        onClick={handleSelect}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        aria-pressed={selected}
        aria-label={option.title}
        disabled={disabled}
      >
        <Icon
          name={selected ? option.iconOn : option.iconOff}
          width={32}
          height={32}
        />
      </button>

      {hovered && (
        <div className={styles.popoverContainer}>
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
