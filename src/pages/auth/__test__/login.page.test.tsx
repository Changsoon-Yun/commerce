import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('asd', () => {
  it('asd', () => {
    render(<div>asd</div>);

    const a = screen.getByText(/asd/);

    expect(a).toBeValid();
  });
});
