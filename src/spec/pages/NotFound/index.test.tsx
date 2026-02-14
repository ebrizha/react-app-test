import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../../../pages/NotFound';

describe('NotFound page', () => {
  test('renders the fallback message and link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/signal lost/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to reviews/i })).toBeInTheDocument();
  });
});

