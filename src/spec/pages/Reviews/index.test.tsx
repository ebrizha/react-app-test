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
    jest.restoreAllMocks();
  });

  test('adds a review via API', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          userName: 'Rogue',
          reviewText: 'Solid neon vibes.',
          vote: 4,
          createdAt: '2026-02-15T10:17:30.041Z',
          updatedAt: '2026-02-15T10:17:30.041Z',
        }),
      } as Response);

    renderApp(['/']);

    await userEvent.type(screen.getByLabelText(/name/i), 'Rogue');
    await userEvent.selectOptions(screen.getByLabelText(/rating/i), '4');
    await userEvent.type(screen.getByLabelText(/review/i), 'Solid neon vibes.');
    await userEvent.click(screen.getByRole('button', { name: /add review/i }));

    expect(await screen.findByText('Rogue')).toBeInTheDocument();
    expect(await screen.findByText('4/5')).toBeInTheDocument();
    expect(await screen.findByText('Solid neon vibes.')).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  test('loads reviews from API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: 1,
            userName: 'Echo',
            reviewText: 'Legendary signal.',
            vote: 5,
            createdAt: '2026-01-01T12:00:00.000Z',
            updatedAt: '2026-01-01T12:00:00.000Z',
          },
        ],
      }),
    } as Response);

    renderApp(['/']);

    expect(await screen.findByText('Echo')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
    expect(screen.getByText('Legendary signal.')).toBeInTheDocument();
  });
});
