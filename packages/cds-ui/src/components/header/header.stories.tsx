import { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Header from './header';

const meta: Meta = {
  title: 'Components/Header',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

type ViewType = 'card' | 'tree';

const DefaultHeader = () => {
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState<ViewType>('card');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValueChange = (value: string) => {
    setViewMode(value as ViewType);
  };

  return (
    <Header
      title="전체 메모"
      count={10}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
      viewMode={viewMode}
      handleValueChange={handleValueChange}
    />
  );
};

/**
 * 기본 Header 컴포넌트입니다.
 * PageTitle, Search, Toggle을 모두 포함한 전체 헤더 레이아웃입니다.
 */
export const Default: Story = {
  render: () => <DefaultHeader />,
};

const MemoListHeader = () => {
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState<ViewType>('card');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValueChange = (value: string) => {
    setViewMode(value as ViewType);
  };

  return (
    <Header
      title="6차 세미나 메모"
      count={25}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
      viewMode={viewMode}
      handleValueChange={handleValueChange}
    />
  );
};

/**
 * 메모 목록 페이지에서 사용하는 Header 예시입니다.
 * 트리뷰가 기본값으로 설정되어 있습니다.
 */
export const MemoList: Story = {
  render: () => <MemoListHeader />,
};

const TitleOnlyHeader = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Header
      title="전체 메모"
      count={10}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
    />
  );
};

/**
 * PageTitle만 표시하는 Header 예시입니다.
 * Toggle은 숨겨지고 Search와 PageTitle만 보입니다.
 */
export const TitleOnly: Story = {
  render: () => <TitleOnlyHeader />,
};

const ToggleOnlyHeader = () => {
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState<ViewType>('card');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValueChange = (value: string) => {
    setViewMode(value as ViewType);
  };

  return (
    <Header
      title="전체 메모"
      count={10}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
      viewMode={viewMode}
      handleValueChange={handleValueChange}
    />
  );
};

/**
 * Toggle만 표시하는 Header 예시입니다.
 * PageTitle은 숨겨지고 Search와 Toggle만 보입니다.
 */
export const ToggleOnly: Story = {
  render: () => <ToggleOnlyHeader />,
};

const SearchOnlyHeader = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Header inputValue={inputValue} handleChangeInput={handleChangeInput} />
  );
};

/**
 * Search만 표시하는 Header 예시입니다.
 * PageTitle과 Toggle이 모두 숨겨진 최소한의 헤더입니다.
 */
export const SearchOnly: Story = {
  render: () => <SearchOnlyHeader />,
};

const EmptySearchHeader = () => {
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState<ViewType>('card');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValueChange = (value: string) => {
    setViewMode(value as ViewType);
  };

  return (
    <Header
      title="검색 결과"
      count={0}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
      viewMode={viewMode}
      handleValueChange={handleValueChange}
    />
  );
};

/**
 * 검색 결과가 없는 경우의 Header 예시입니다.
 * count가 0으로 표시됩니다.
 */
export const EmptySearch: Story = {
  render: () => <EmptySearchHeader />,
};
