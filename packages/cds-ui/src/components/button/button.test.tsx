import { render, screen } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
