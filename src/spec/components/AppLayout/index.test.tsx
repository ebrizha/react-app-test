import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../../../components/AppLayout';

describe('AppLayout', () => {
  test('renders shared header, nav, and outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<div>Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/cyberpunk console/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reviews/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/outlet content/i)).toBeInTheDocument();
  });
});

