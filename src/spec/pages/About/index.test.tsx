import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../../../pages/About';

describe('About page', () => {
  test('renders the about content and guidance', () => {
    render(<AboutPage />);

    expect(screen.getByText(/about the console/i)).toBeInTheDocument();
    expect(screen.getByText(/modular, page-based layout/i)).toBeInTheDocument();
    expect(screen.getAllByText(/src\/pages/i).length).toBeGreaterThan(0);
  });
});
