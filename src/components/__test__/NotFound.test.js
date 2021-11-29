import { render } from '@testing-library/react';
import { NotFound } from '../NotFound';

describe('can get Not Found message', () => {
  it('shows not found message', () => {
    const { getByText } = render(<NotFound/>)
    expect(getByText('Not Found')).toBeInTheDocument();
    expect(getByText('404')).toBeInTheDocument();
  });
});