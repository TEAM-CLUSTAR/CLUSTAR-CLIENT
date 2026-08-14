import { useState } from 'react';

import { Tooltip } from '@cds/ui';

import { PromptInputValueType } from '@shared/components/ai-panel/types/types';

import PromptOptionItem from './prompt-option-item';

import * as styles from './prompt-option.css';

const OPTIONS = [
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
  selectedOptionId: PromptInputValueType['option'];
  onOptionSelect: (optionId: PromptInputValueType['option']) => void;
  disabled?: boolean;
}

const PromptOption = ({
  selectedOptionId,
  onOptionSelect,
  disabled = false,
}: PromptOptionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => {
        return (
          <div key={option.id} className={styles.optionContainer}>
            <PromptOptionItem
              iconName={option.iconName}
              isSelected={selectedOptionId === option.id}
              onClick={() => onOptionSelect(option.id)}
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
