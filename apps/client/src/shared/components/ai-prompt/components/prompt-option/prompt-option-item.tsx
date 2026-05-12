import { Icon } from '@cds/icon';

import { PromptOptionType } from './prompt-option';

import * as styles from './prompt-option.css';

interface PromptOptionItemProps {
  option: PromptOptionType;
  selected: boolean;
  handleSelect: () => void;
  disabled?: boolean;
}

const PromptOptionItem = ({
  option,
  selected,
  handleSelect,
  disabled = false,
}: PromptOptionItemProps) => {
  return (
    <button
      type="button"
      className={styles.optionItem({ active: selected })}
      onClick={handleSelect}
      aria-pressed={selected}
      aria-label={option.title}
      disabled={disabled}
    >
      <Icon
        name={option.iconName}
        size={32}
        color={selected ? 'grey800' : 'grey500'}
      />
    </button>
  );
};

export default PromptOptionItem;
