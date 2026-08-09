import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchBar from './search-bar';

interface ControlledSearchBarProps {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

const ControlledSearchBar = ({
  initialValue = '',
  onValueChange,
}: ControlledSearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <SearchBar value={value} onChange={handleValueChange} onSearch={vi.fn()} />
  );
};

describe('SearchBar', () => {
  it('focuses the search input on mount', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveFocus();
  });

  it('calls onChange with the next value while typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ControlledSearchBar onValueChange={handleChange} />);

    await user.type(screen.getByRole('searchbox'), 'memo');

    expect(handleChange).toHaveBeenLastCalledWith('memo');
  });

  it('calls onSearch when Enter is pressed with a non-empty value', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(
      <SearchBar value="memo" onChange={vi.fn()} onSearch={handleSearch} />,
    );

    await user.keyboard('{Enter}');

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('searchbox')).not.toHaveFocus();
  });

  it('does not call onSearch when Enter is pressed with an empty value', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(
      <SearchBar value="   " onChange={vi.fn()} onSearch={handleSearch} />,
    );

    await user.keyboard('{Enter}');

    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('does not call onSearch while composing IME text', () => {
    const handleSearch = vi.fn();

    render(
      <SearchBar value="메모" onChange={vi.fn()} onSearch={handleSearch} />,
    );

    const input = screen.getByRole('searchbox');
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        isComposing: true,
      }),
    );

    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('shows a clear button while the input has a value and clears the input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <ControlledSearchBar initialValue="memo" onValueChange={handleChange} />,
    );

    await user.click(screen.getByRole('button', { name: '검색어 지우기' }));

    expect(handleChange).toHaveBeenLastCalledWith('');
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
});
