import { Icon } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import { PromptOptionType } from './prompt-option';

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
  const isActive = selected || hovered;

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
          name={isActive ? option.iconOn : option.iconOff}
          width={36}
          height={36}
        />
      </button>

      {hovered && (
        <div className={styles.popoverContainer}>
          <Tooltip title={option.title} description={option.description} />
        </div>
      )}
    </div>
  );
};

export default PromptOptionItem;
