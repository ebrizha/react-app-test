import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';

const renderApp = (initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );

describe('Reviews page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds a review and stores it', async () => {
    renderApp();

    await userEvent.type(screen.getByLabelText(/name/i), 'Rogue');
    await userEvent.selectOptions(screen.getByLabelText(/rating/i), '4');
    await userEvent.type(screen.getByLabelText(/review/i), 'Solid neon vibes.');
    await userEvent.click(screen.getByRole('button', { name: /add review/i }));

    expect(screen.getByText('Rogue')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('Solid neon vibes.')).toBeInTheDocument();

    const stored = localStorage.getItem('cyberpunk-reviews');
    expect(stored).toMatch(/Solid neon vibes/);
  });

  test('loads reviews from localStorage', () => {
    localStorage.setItem(
      'cyberpunk-reviews',
      JSON.stringify([
        {
          id: '1',
          name: 'Echo',
          rating: 5,
          message: 'Legendary signal.',
          createdAt: '2026-01-01T12:00:00.000Z',
        },
      ])
    );

    renderApp();

    expect(screen.getByText('Echo')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
    expect(screen.getByText('Legendary signal.')).toBeInTheDocument();
  });
});

