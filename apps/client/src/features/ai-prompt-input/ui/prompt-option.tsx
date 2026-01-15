import { useState } from 'react';

import { IconName } from '@cds/icon';

import PromptOptionItem from './prompt-option-item';

import * as styles from './prompt-option.css';

export interface PromptOptionType {
  id: string;
  iconOn: IconName;
  iconOff: IconName;
  title: string;
  description: string;
}

const OPTIONS: PromptOptionType[] = [
  {
    id: 'breif',
    iconOn: 'ic_breif_on',
    iconOff: 'ic_breif_off',
    title: '정리본',
    description: '여러 메모를 하나의 문서로 정리',
  },
  {
    id: 'summary',
    iconOn: 'ic_summary_on',
    iconOff: 'ic_summary_off',
    title: '요약본',
    description: '핵심만 간단 정리',
  },
  {
    id: 'structure',
    iconOn: 'ic_structure_on',
    iconOff: 'ic_structure_off',
    title: '구조화',
    description: '아웃라인과 논리 구조 설계',
  },
] as const;

const PromptOption = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => (
        <PromptOptionItem
          key={option.id}
          option={option}
          selected={selectedId === option.id}
          hovered={hoveredId === option.id}
          handleSelect={() => handleSelect(option.id)}
          handleHover={() => setHoveredId(option.id)}
          handleLeave={() => setHoveredId(null)}
        />
      ))}
    </div>
  );
};

export default PromptOption;
