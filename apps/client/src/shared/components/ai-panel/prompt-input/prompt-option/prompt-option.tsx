import { useState } from 'react';

import { IconName } from '@cds/icon';
import { Tooltip } from '@cds/ui';

import PromptOptionItem from './prompt-option-item';

import * as styles from './prompt-option.css';

export interface PromptOptionType {
  id: string;
  iconName: IconName;
  title: string;
  description: string;
}

const OPTIONS: PromptOptionType[] = [
  {
    id: 'MERGE',
    iconName: 'ic_breif',
    title: '정리본',
    description: '여러 메모를 하나의 문서로 정리',
  },
  {
    id: 'SUMMARY',
    iconName: 'ic_summary',
    title: '요약본',
    description: '핵심만 간단 정리',
  },
  {
    id: 'STRUCTURE',
    iconName: 'ic_structure',
    title: '구조화',
    description: '아웃라인과 논리 구조 설계',
  },
] as const;

interface PromptOptionProps {
  selectedOptionId: string | null;
  handleOptionSelect: (optionId: string | null) => void;
  disabled?: boolean;
}

const PromptOption = ({
  selectedOptionId,
  handleOptionSelect,
  disabled = false,
}: PromptOptionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (disabled) return;
    const newSelectedId = selectedOptionId === id ? null : id;
    handleOptionSelect(newSelectedId);
  };

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => {
        return (
          <div key={option.id} className={styles.optionContainer}>
            <PromptOptionItem
              iconName={option.iconName}
              isSelected={selectedOptionId === option.id}
              onClick={() => handleSelect(option.id)}
              onMouseEnter={() => setHoveredId(option.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-pressed={selectedOptionId === option.id}
              aria-label={option.title}
              disabled={disabled}
            />

            {hoveredId === option.id && (
              <div className={styles.popoverContainer}>
                <Tooltip
                  title={option.title}
                  description={option.description}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PromptOption;
