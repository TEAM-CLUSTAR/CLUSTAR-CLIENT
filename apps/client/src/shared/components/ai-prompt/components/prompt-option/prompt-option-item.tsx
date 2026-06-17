import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './prompt-option.css';

interface PromptOptionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  isSelected: boolean;
}

const PromptOptionItem = ({
  iconName,
  isSelected,
  ...props
}: PromptOptionItemProps) => {
  return (
    <button
      type="button"
      className={styles.optionItem({ isSelected })}
      {...props}
    >
      <Icon
        name={iconName}
        size={32}
        color={isSelected ? 'grey800' : 'grey500'}
      />
    </button>
  );
};

export default PromptOptionItem;
